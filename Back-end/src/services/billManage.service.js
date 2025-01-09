"use strict";

const { where, Sequelize, Op } = require("sequelize");
const Bill = require("../models/Bill");
const BillDetail = require("../models/BillDetail");
const BilliardTable = require("../models/BilliardTable");
const MenuItem = require("../models/MenuItem");
const menuManageService = require("./menuManage.service");
const sequelize = require("../configs/sequelize");
const { ServerError, BadRequestError } = require("../core/error.response");
const Customer = require("../models/Customer");
const Booking = require("../models/Booking");
const convertUTCToGMT7String = require("../helpers/UTCToStringDate");
const stringToUTCDate = require("../helpers/stringDateToUTC");

const Promotion = require("../models/Promotion");
const checkPromotionUsage = require("../helpers/checkPromotionUsage");

class billManageService {
  static getAllBill = async () => {
    const foundBillList = await Bill.findAll(); // Retrieve all bills

    // Use Promise.all to handle asynchronous mapping
    const returnList = await Promise.all(
      foundBillList.map(async (bill) => {
        const billDetail = await BillDetail.findAll({
          attributes: ["itemType", "item_id", "quantity", "price"],
          where: { bill_id: bill.id },
        });

        return {
          id: bill.id,
          bill_detail: billDetail,
          created_at: convertUTCToGMT7String(bill.createdAt),
        };
      })
    );

    return returnList; // Return the resolved list
  };

  static getAllBillPagination = async (page_size, page_number) => {
    if (!page_number) {
      throw new BadRequestError("Page number is required");
    }
    if (page_number < 1) {
      throw new BadRequestError("Invalid page number");
    }
    if (page_size < 1) {
      throw new BadRequestError("Invalid page size");
    }

    const pageSizeInt = parseInt(page_size, 10);
    const pageNumberInt = parseInt(page_number, 10);
    const totalRecords = await Bill.count();
    const totalPages = Math.ceil(totalRecords / pageSizeInt);
    const foundBillList = await Bill.findAll({
      limit: pageSizeInt,
      offset: (pageNumberInt - 1) * pageSizeInt,
    });

    const returnList = await Promise.all(
      foundBillList.map(async (bill) => {
        // const billDetail = await BillDetail.findAll({
        //   attributes: ["itemType", "item_id", "quantity", "price"],
        //   where: { bill_id: bill.id },
        // });
        const foundCustomer = await Customer.findOne({
          where: { id: bill.customer_id },
        });

        return {
          id: bill.id,
          customer_name: foundCustomer.name,
          price: bill.total_price,
          total_quantity: bill.item_quantity,
          created_at: convertUTCToGMT7String(bill.createdAt),
        };
      })
    );

    return {
      totalRecords,
      totalPages,
      currentPage: pageNumberInt,
      pageSize: pageSizeInt,
      bills: returnList,
    };
  };

  static getBillDetailByID = async (bill_id) => {
    if (!bill_id) {
      throw new BadRequestError("Bill ID is required");
    }

    const foundBill = await Bill.findOne({ where: { id: bill_id } });
    if (!foundBill) {
      throw new BadRequestError("Bill not found");
    }
    const foundCustomer = await Customer.findOne({
      where: { id: foundBill.customer_id },
    });

    const foundBillDetails = await BillDetail.findAll({
      where: { bill_id: bill_id },
      attributes: [
        "id",
        "itemType",
        "quantity",
        "price",
        "start_time",
        "end_time",
      ],
      include: [
        {
          model: MenuItem,
          as: "menuItem",
          attributes: ["name"],
          required: false, // Allow null if itemType is not MenuItem
          where: {
            "$BillDetail.itemType$": "MenuItem", // Filter based on itemType
          },
        },
        {
          model: BilliardTable,
          as: "billiardTable",
          attributes: ["table_type"],
          required: false, // Allow null if itemType is not BilliardTable
          where: {
            "$BillDetail.itemType$": "BilliardTable", // Filter based on itemType
          },
        },
      ],
    });

    // Transform start_time and end_time using convertUTCToGMT7String
    const transformedBillDetails = foundBillDetails.map((detail) => {
      return {
        ...detail.get(), // Convert Sequelize instance to plain object
        start_time: detail.start_time
          ? convertUTCToGMT7String(detail.start_time)
          : null,
        end_time: detail.end_time
          ? convertUTCToGMT7String(detail.end_time)
          : null,
      };
    });

    return {
      id: foundBill.id,
      customer_name: foundCustomer.name,
      total_price: foundBill.total_price,
      promotion: foundBill.promotion,
      total_discount: foundBill.total_discount,
      checkout_price: foundBill.checkout_price,
      bill_detail: transformedBillDetails,
      created_at: convertUTCToGMT7String(foundBill.createdAt),
    };
  };

  static createBill = async ({
    booking_id,
    customer_id,
    staff_id,
    bill_details,
    promotion_id,
  }) => {
    const transaction = await sequelize.transaction();
    let currentPromotionID = promotion_id ?? -1;

    try {
      const isBooking = Boolean(booking_id);
      let billCustomerID = customer_id;

      if (isBooking) {
        const booking = await Booking.findOne({
          where: { id: booking_id },
          transaction,
        });
        if (!booking) throw new BadRequestError("Booking not found");
        billCustomerID = booking.customer_id;
      }

      const bill = await this.initializeBill({
        booking_id,
        customer_id: billCustomerID,
        staff_id,
        transaction,
      });

      if (isBooking) {
        currentPromotionID = await this.processBookingBill({
          booking_id,
          staff_id,
          bill,
          transaction,
        });
      } else {
        await this.processCustomBill({
          bill_details,
          bill,
          customer_id: billCustomerID,
          transaction,
        });
      }

      await this.finalizeBill({
        bill,
        customer_id: billCustomerID,
        promotion_id:
          currentPromotionID !== -1 ? currentPromotionID : promotion_id,
        transaction,
      });
      await transaction.commit();

      return { billID: bill.id };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  // Helper: Initialize bill
  static initializeBill = async ({
    booking_id,
    customer_id,
    staff_id,
    transaction,
  }) => {
    return await Bill.create(
      {
        item_quantity: booking_id ? 1 : 0,
        total_price: 0,
        customer_id,
        staff_id,
        checkout_price: 0,
      },
      { transaction }
    );
  };

  // Helper: Process booking bill
  static processBookingBill = async ({
    booking_id,
    staff_id,
    bill,
    transaction,
  }) => {
    if (!staff_id) throw new BadRequestError("Staff ID is required");

    const booking = await Booking.findOne({
      where: { id: booking_id },
      transaction,
    });
    if (!booking) throw new BadRequestError("Booking not found");

    await booking.update(
      { status: "completed", updatedAt: new Date() },
      { transaction }
    );

    const billiardTable = await BilliardTable.findOne({
      where: { id: booking.table_id },
      transaction,
    });
    if (!billiardTable) throw new BadRequestError("Billiard Table not found");

    const price = this.calculateBilliardTablePrice({
      start_time: booking.start_time,
      end_time: booking.end_time,
      hourlyRate: billiardTable.price,
    });

    bill.total_price = price;
    await BillDetail.create(
      {
        bill_id: bill.id,
        itemType: "BilliardTable",
        item_id: booking.table_id,
        start_time: booking.start_time,
        end_time: booking.end_time,
        price,
        quantity: 1,
      },
      { transaction }
    );
    if (booking.promotion_code) {
      if (checkPromotionUsage(booking.promotion_code)) {
        const foundPromotion = await Promotion.findOne({
          where: { promotion_code: booking.promotion_code },
        });
        if (!foundPromotion) {
          throw new BadRequestError("Promotion not found");
        }
        return foundPromotion.id;
      }
    }
    return -1;
  };

  // Helper: Process custom bill
  static processCustomBill = async ({
    bill_details,
    bill,
    customer_id,
    transaction,
  }) => {
    if (!bill_details || bill_details.length === 0)
      throw new BadRequestError("Bill details are required");

    let total_price = 0;

    for (const item of bill_details) {
      const detailPrice = await this.processBillDetail({
        item,
        customer_id,
        transaction,
      });
      total_price += detailPrice;
      let startTime, endTime;
      if (item.itemType === "BilliardTable") {
        startTime = stringToUTCDate(item.start_time);
        endTime = stringToUTCDate(item.end_time);
        if (startTime === false || endTime === false) {
          throw new BadRequestError("Invalid date format");
        }
      } else {
        startTime = endTime = new Date();
      }

      await BillDetail.create(
        {
          bill_id: bill.id,
          itemType: item.itemType,
          item_id: item.item_id,
          quantity: item.quantity ?? 1,
          price: detailPrice,
          start_time: startTime,
          end_time: endTime,
        },
        { transaction }
      );
    }

    bill.total_price = total_price;
  };

  // Helper: Process individual bill detail
  static processBillDetail = async ({ item, customer_id, transaction }) => {
    if (item.itemType === "MenuItem") {
      const menuItem = await MenuItem.findOne({
        where: { id: item.item_id },
        transaction,
      });
      if (!menuItem || item.quantity > menuItem.quantity)
        throw new BadRequestError("Insufficient menu item quantity");

      await menuManageService.updateMenuItem(
        { menu_id: item.item_id, quantity: menuItem.quantity - item.quantity },
        transaction
      );

      return menuItem.price * item.quantity;
    } else if (item.itemType === "BilliardTable") {
      const billiardTable = await BilliardTable.findOne({
        where: { id: item.item_id },
        transaction,
      });
      if (!billiardTable) throw new BadRequestError("BilliardTable not found");

      const startTime = stringToUTCDate(item.start_time);
      const endTime = stringToUTCDate(item.end_time);

      const overlappingBooking = await Booking.findOne({
        where: {
          table_id: item.item_id,
          [Op.or]: [
            { start_time: { [Op.between]: [startTime, endTime] } },
            { end_time: { [Op.between]: [startTime, endTime] } },
            {
              [Op.and]: [
                { start_time: { [Op.lte]: startTime } },
                { end_time: { [Op.gte]: endTime } },
              ],
            },
          ],
        },
        transaction,
      });

      if (overlappingBooking)
        throw new BadRequestError(
          "Table is already booked for the requested time span"
        );

      await Booking.create(
        {
          table_id: item.item_id,
          customer_id,
          start_time: startTime,
          end_time: endTime,
          status: "completed",
        },
        { transaction }
      );

      return this.calculateBilliardTablePrice({
        start_time: item.start_time,
        end_time: item.end_time,
        hourlyRate: billiardTable.price,
      });
    } else {
      throw new BadRequestError("Invalid item type");
    }
  };

  // Helper: Finalize bill with promotion and points
  static finalizeBill = async ({
    bill,
    customer_id,
    promotion_id,
    transaction,
  }) => {
    const customer = await Customer.findOne({
      where: { id: customer_id },
      transaction,
    });
    if (!customer) throw new BadRequestError("Customer not found");

    if (!promotion_id) {
      bill.total_discount = 0;
      bill.checkout_price = bill.total_price;
    } else {
      const foundPromotion = await Promotion.findOne({
        where: { id: promotion_id },
      });
      if (!foundPromotion) {
        throw new BadRequestError("Promotion not found");
      }
      bill.total_discount =
        bill.total_price * (foundPromotion.discount_rate / 100);
      bill.checkout_price = bill.total_price - bill.total_discount;
      await bill.addPromotion(foundPromotion, { transaction });
    }

    customer.points += Math.round(bill.checkout_price / 1000);
    await Promise.all([
      bill.save({ transaction }),
      customer.save({ transaction }),
    ]);
  };

  // Helper: Calculate billiard table price
  static calculateBilliardTablePrice = ({
    start_time,
    end_time,
    hourlyRate,
  }) => {
    const timeDifferenceInMinutes =
      (new Date(end_time) - new Date(start_time)) / (1000 * 60);
    const roundedQuarterHours = Math.ceil(timeDifferenceInMinutes / 15) * 15;
    return (roundedQuarterHours / 60) * hourlyRate;
  };
}

module.exports = billManageService;
