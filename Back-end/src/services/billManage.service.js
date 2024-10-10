"use strict";

const { where } = require("sequelize");
const Bill = require("../models/Bill");
const BillDetail = require("../models/BillDetail");
const BilliardTable = require("../models/BilliardTable");

class billManageService {
  static createBill = async (bill_details) => {
    const total_price = 0;
    const item_quantity = bill_details.length;
    const newBill = await Bill.create({
      item_quantity: item_quantity,
      total_price: total_price,
    });
    if (!newBill) {
      throw new Error("Bill not created");
    }
    for (const item of bill_details) {
      let newBillDetail;
      if (item.itemType === "MenuItem") {
        newBillDetail = await BillDetail.create({
          BillId: newBill.id,
          itemType: item.itemType,
          itemId: item.itemId,
          quantity: item.quantity ?? 1,
        });
      } else if (item.itemType === "BilliardTable") {
        const foundedBilliardTable = await BilliardTable.findOne({
          where: { id: item.itemId },
        });
        console.log("Founded Billiard Table:::", foundedBilliardTable);
        if (!foundedBilliardTable) {
          throw new Error("BilliardTable not found");
        }
        if (
          item.start_time > item.end_time ||
          !item.start_time ||
          !item.end_time
        ) {
          throw new Error("Invalid time");
        }
        const timeDifferenceInMinutes =
          (new Date(item.end_time) - new Date(item.start_time)) / (1000 * 60);

        // Round up to the nearest quarter hour (15 minutes)
        const roundedQuarterHours =
          Math.ceil(timeDifferenceInMinutes / 15) * 15;
        const price = (roundedQuarterHours / 60) * foundedBilliardTable.price;
        console.log(price);
        newBillDetail = await BillDetail.create({
          BillId: newBill.id,
          itemType: item.itemType,
          itemId: item.itemId,
          start_time: item.start_time,
          end_time: item.end_time,
          price: price,
          quantity: 1,
        });
      } else {
        throw new Error("Item type not found");
      }
      if (!newBillDetail) {
        throw new Error("BillDetail not created");
      }
    }
    newBill.total_price = await BillDetail.sum("price", {
      where: { BillId: newBill.id },
    });
    return "Bill created successfully";
  };
}

module.exports = billManageService;
