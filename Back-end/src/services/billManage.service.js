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

class billManageService {
  static createBill = async ({ customer_id, staff_id, bill_details }) => {
    const transaction = await sequelize.transaction();
    console.log(bill_details);
    const bill_length = bill_details.length;
    try {
      const newBill = await Bill.create(
        {
          item_quantity: bill_length,
          total_price: 0,
          customer_id: customer_id,
          staff_id: staff_id,
        },
        { transaction: transaction }
      );
      if (!newBill) {
        throw new ServerError("Bill not created");
      }

      for (const item of bill_details) {
        if (item.itemType === "MenuItem") {
          const foundedMenuItem = await MenuItem.findOne({
            where: { id: item.itemId },
            transaction,
          });
          if (!foundedMenuItem || item.quantity > foundedMenuItem.quantity) {
            throw new BadRequestError("Insufficient quantity");
          }

          await menuManageService.updateMenuItem(
            {
              menu_id: item.itemId,
              quantity: foundedMenuItem.quantity - item.quantity,
            },
            transaction
          );

          await BillDetail.create(
            {
              bill_id: newBill.id,
              itemType: item.itemType,
              itemId: item.itemId,
              quantity: item.quantity ?? 1,
              price: foundedMenuItem.price * (item.quantity ?? 1),
              start_time: new Date(),
              end_time: new Date(),
            },
            { transaction }
          );
        } else if (item.itemType === "BilliardTable") {
          const foundedBilliardTable = await BilliardTable.findOne({
            where: { id: item.itemId },
            transaction: transaction,
          });
          if (!foundedBilliardTable) {
            throw new BadRequestError("BilliardTable not found");
          }

          const timeDifferenceInMinutes =
            (new Date(item.end_time) - new Date(item.start_time)) / (1000 * 60);
          const roundedQuarterHours =
            Math.ceil(timeDifferenceInMinutes / 15) * 15;
          const price = (roundedQuarterHours / 60) * foundedBilliardTable.price;

          await BillDetail.create(
            {
              bill_id: newBill.id,
              itemType: item.itemType,
              itemId: item.itemId,
              start_time: item.start_time,
              end_time: item.end_time,
              price,
              quantity: 1,
            },
            { transaction: transaction }
          );
        } else {
          throw new BadRequestError("Invalid item type");
        }
      }

      // Update total_price after all BillDetails are created
      const total_price = await BillDetail.sum("price", {
        where: { bill_id: newBill.id },
        transaction,
      });
      newBill.total_price = total_price;
      await newBill.save({ transaction: transaction });

      const addedPoint = Math.round(total_price / 1000);

      const currentCustomer = await Customer.findOne({
        where: { id: customer_id },
        transaction: transaction,
      });
      if (!currentCustomer) {
        throw new BadRequestError("Customer not found");
      }
      currentCustomer.points += addedPoint;
      await currentCustomer.save({ transaction: transaction });
      await transaction.commit();
      return "Bill created successfully";
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}

module.exports = billManageService;
