"use strict";

const MenuItem = require("../models/MenuItem");

class menuManageService {
  static getMenuList = async () => {
    const menuList = await MenuItem.findAll();
    if (!menuList) {
      throw new Error("Menu list not found");
    }
    return menuList;
  };
  static createMenuItem = async ({ name, price, quantity }) => {
    const newMenuItem = await MenuItem.create({
      name,
      price,
      quantity,
    });
    if (!newMenuItem) {
      throw new Error("Menu item not created");
    }
    return "Menu item created successfully";
  };
  static updateMenuItem = async (
    { menu_id, name, price, quantity },
    transaction
  ) => {
    const foundMenuItem = await MenuItem.findOne({ where: { id: menu_id } });
    if (!foundMenuItem) {
      throw new Error("Menu item not found");
    }
    // Create an object with only the fields that are passed and not undefined
    const updatedFields = {
      name: name ?? foundMenuItem.name,
      price: price ?? foundMenuItem.price,
      quantity: quantity ?? foundMenuItem.quantity,
    };

    // Only update the fields that have changed
    const [numberOfAffectedRows] = await MenuItem.update(updatedFields, {
      where: { id: menu_id },
      transaction: transaction,
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Menu item not updated");
    }
    return "Menu item updated successfully";
  };
  static deleteMenuItem = async ({ menu_id }) => {
    const foundMenuItem = await MenuItem.findOne({ where: { id: menu_id } });
    if (!foundMenuItem) {
      throw new Error("Menu item not found");
    }
    const deletedMenuItem = await MenuItem.destroy({ where: { id: menu_id } });
    if (!deletedMenuItem) {
      throw new Error("Menu item not deleted");
    }
    return "Menu item deleted successfully";
  };
}

module.exports = menuManageService;
