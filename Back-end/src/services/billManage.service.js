"use strict";

const { where, Sequelize } = require("sequelize");
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
        if (!staff_id) {
          throw new BadRequestError("Staff ID is required");
        }

        const foundBooking = await Booking.findOne({
          where: { id: booking_id },
          transaction: transaction,
        });
        if (!foundBooking) {
          throw new BadRequestError("Booking not found");
        }

        await foundBooking.update(
          {
            status: "completed",
            updatedAt: new Date(),
          },
          { transaction: transaction }
        );

        const foundBilliardTable = await BilliardTable.findOne({
          where: { id: foundBooking.table_id },
          transaction: transaction,
        });

        if (!foundBilliardTable) {
          throw new BadRequestError("Billiard Table not found");
        }

        const price = this.calculateBilliardTablePrice({
          start_time: foundBooking.start_time,
          end_time: foundBooking.end_time,
          hourlyRate: foundBilliardTable.price,
        });

        newBill = await Bill.create(
          {
            item_quantity: 1,
            total_price: price,
            customer_id: foundBooking.customer_id,
            staff_id: staff_id,
          },
          { transaction: transaction }
        );

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
        await transaction.commit();
        return "Bill created successfully";
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
                start_time: item.start_time,
                end_time: item.end_time,
                price,
                quantity: 1,
              },
              { transaction }
            );
          } else {
            throw new BadRequestError("Invalid item type");
          }
        }

        newBill.total_price = total_price;
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
      return "Bill created successfully";
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
