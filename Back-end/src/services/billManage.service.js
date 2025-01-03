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
  }) => {
    const transaction = await sequelize.transaction();

    try {
      let newBill;
      if (booking_id) {
        // Ensure that staff_id is provided for bill creation with booking
        if (!staff_id) {
          throw new BadRequestError("Staff ID is required");
        }

        // Fetch the booking
        const foundBooking = await Booking.findOne({
          where: { id: booking_id },
          transaction: transaction,
        });

        // If booking is not found, throw an error
        if (!foundBooking) {
          throw new BadRequestError("Booking not found");
        }

        // Update the booking to completed status
        await foundBooking.update(
          {
            status: "completed",
            updatedAt: new Date(),
          },
          { transaction: transaction }
        );

        // Fetch the Billiard Table information
        const foundBilliardTable = await BilliardTable.findOne({
          where: { id: foundBooking.table_id },
          transaction: transaction,
        });

        // If Billiard Table is not found, throw an error
        if (!foundBilliardTable) {
          throw new BadRequestError("Billiard Table not found");
        }

        // Calculate the price for the Billiard Table
        const price = this.calculateBilliardTablePrice({
          start_time: foundBooking.start_time,
          end_time: foundBooking.end_time,
          hourlyRate: foundBilliardTable.price,
        });

        // Create the bill for the booking
        newBill = await Bill.create(
          {
            item_quantity: 1,
            total_price: price,
            customer_id: foundBooking.customer_id,
            checkout_price: 0,
            staff_id: staff_id,
          },
          { transaction: transaction }
        );

        // Create the BillDetail for the Billiard Table
        await BillDetail.create(
          {
            bill_id: newBill.id,
            itemType: "BilliardTable",
            item_id: foundBooking.table_id,
            start_time: foundBooking.start_time,
            end_time: foundBooking.end_time,
            price: price,
            quantity: 1,
          },
          { transaction: transaction }
        );

        // Fetch the customer for promotion and discount
        const foundCustomer = await Customer.findOne({
          where: { id: foundBooking.customer_id },
          transaction: transaction,
        });

        if (!foundCustomer) {
          throw new BadRequestError("Customer not found");
        }

        // Calculate promotion and discount based on customer points
        let total_price = price;
        const promotion =
          foundCustomer.points > 1000
            ? "Super"
            : foundCustomer.points > 500
            ? "VIP"
            : "Common";

        const discountAmount =
          foundCustomer.points > 1000
            ? total_price * 0.15
            : foundCustomer.points > 500
            ? total_price * 0.1
            : 0;

        // Calculate checkout price after discount
        const checkout_price = total_price - discountAmount;

        // Update the bill with promotion and discount details
        newBill.total_price = total_price;
        newBill.promotion = promotion;
        newBill.total_discount = discountAmount;
        newBill.checkout_price = checkout_price;
        await newBill.save({ transaction });

        // Add points based on the total price
        const addedPoint = Math.round(newBill.total_price / 1000);
        foundCustomer.points += addedPoint;
        await foundCustomer.save({ transaction });

        // Commit the transaction
        await transaction.commit();
        return { billID: newBill.id };
      } else {
        if (!bill_details || bill_details.length === 0) {
          throw new BadRequestError("Bill details are required");
        }

        newBill = await Bill.create(
          {
            item_quantity: bill_details.length,
            total_price: 0,
            customer_id: customer_id,
            staff_id: staff_id,
            checkout_price: 0,
          },
          { transaction }
        );
        if (!newBill) {
          throw new ServerError("Bill not created");
        }

        let total_price = 0;

        for (const item of bill_details) {
          if (item.itemType === "MenuItem") {
            const foundMenuItem = await MenuItem.findOne({
              where: { id: item.item_id },
              transaction,
            });
            if (!foundMenuItem || item.quantity > foundMenuItem.quantity) {
              throw new BadRequestError("Insufficient menu item quantity");
            }

            await menuManageService.updateMenuItem(
              {
                menu_id: item.item_id,
                quantity: foundMenuItem.quantity - item.quantity,
              },
              transaction
            );

            const price = foundMenuItem.price * item.quantity;
            total_price += price;

            await BillDetail.create(
              {
                bill_id: newBill.id,
                itemType: item.itemType,
                item_id: item.item_id,
                quantity: item.quantity,
                price,
                start_time: new Date(),
                end_time: new Date(),
              },
              { transaction }
            );
          } else if (item.itemType === "BilliardTable") {
            const foundBilliardTable = await BilliardTable.findOne({
              where: { id: item.item_id },
              transaction,
            });
            if (!foundBilliardTable) {
              throw new BadRequestError("BilliardTable not found");
            }
            // Check if the table is available for the requested time span
            const startTime = stringToUTCDate(item.start_time);
            const endTime = stringToUTCDate(item.end_time);
            const existingBooking = await Booking.findOne({
              where: {
                table_id: item.item_id,
                [Op.or]: [
                  {
                    start_time: { [Op.between]: [startTime, endTime] },
                  },
                  {
                    end_time: { [Op.between]: [startTime, endTime] },
                  },
                  {
                    [Op.and]: [
                      { start_time: { [Op.lte]: startTime } },
                      { end_time: { [Op.gte]: endTime } },
                    ],
                  },
                ],
              },
            });

            if (existingBooking) {
              throw new BadRequestError(
                "Table is already booked for the requested time span"
              );
            }

            const createdBooking = Booking.create({
              table_id: item.item_id,
              customer_id: customer_id,
              start_time: startTime,
              end_time: endTime,
              status: "completed",
            });
            if (!createdBooking) {
              throw new ServerError("Booking not created");
            }

            const price = this.calculateBilliardTablePrice({
              start_time: item.start_time,
              end_time: item.end_time,
              hourlyRate: foundBilliardTable.price,
            });

            total_price += price;

            await BillDetail.create(
              {
                bill_id: newBill.id,
                itemType: item.itemType,
                item_id: item.item_id,
                start_time: startTime,
                end_time: endTime,
                price,
                quantity: 1,
              },
              { transaction }
            );
          } else {
            throw new BadRequestError("Invalid item type");
          }
        }
        const foundCustomer = await Customer.findOne({
          where: { id: customer_id },
          transaction,
        });
        if (!foundCustomer) {
          throw new BadRequestError("Customer not found");
        }
        const promotion =
          foundCustomer.points > 1000
            ? "Super"
            : foundCustomer.points > 500
            ? "VIP"
            : "Common";
        const discountAmount =
          foundCustomer.points > 1000
            ? total_price * 0.15
            : foundCustomer.points > 500
            ? total_price * 0.1
            : 0;
        const checkout_price = total_price - discountAmount;
        newBill.total_price = total_price;
        newBill.promotion = promotion;
        newBill.total_discount = discountAmount;
        newBill.checkout_price = checkout_price;
        await newBill.save({ transaction });
      }

      const addedPoint = Math.round(newBill.total_price / 1000);
      const currentCustomer = await Customer.findOne({
        where: { id: customer_id },
        transaction,
      });
      if (!currentCustomer) {
        throw new BadRequestError("Customer not found");
      }
      currentCustomer.points += addedPoint;
      await currentCustomer.save({ transaction });

      await transaction.commit();
      return { billID: newBill.id };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  // Helper function to calculate billiard table price
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
