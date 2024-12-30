"use strict";

const { BadRequestError, ServerError } = require("../core/error.response");
const MenuItem = require("../models/MenuItem");

class menuManageService {
  static getMenuList = async () => {
    const menuList = await MenuItem.findAll();
    if (!menuList) {
      throw new BadRequestError("Menu list not existed");
    }
    return menuList;
  };
  static getMenuListPagination = async (page_size, page_number) => {
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
    const totalRecords = await MenuItem.count();
    const totalPages = Math.ceil(totalRecords / pageSizeInt);
    const foundMenuList = await MenuItem.findAll({
      limit: pageSizeInt,
      offset: (pageNumberInt - 1) * pageSizeInt,
    });
    if (!foundMenuList) {
      throw new BadRequestError("Menu list not found");
    }
    return {
      totalRecords,
      totalPages,
      currentPage: pageNumberInt,
      pageSize: pageSizeInt,
      menuItems: foundMenuList,
    };
  };
  static createMenuItem = async ({ name, price, quantity }) => {
    if (!name || !price || !quantity) {
      throw new BadRequestError("Please fill all the required fields");
    }
    const newMenuItem = await MenuItem.create({
      name,
      price,
      quantity,
    });
    if (!newMenuItem) {
      throw new ServerError("Menu item not created");
    }
    return "Menu item created successfully";
  };
  static updateMenuItem = async (
    { menu_id, name, price, quantity },
    transaction
  ) => {
    if (!menu_id) {
      throw new BadRequestError("Menu ID is required");
    }
    const foundMenuItem = await MenuItem.findOne({ where: { id: menu_id } });
    if (!foundMenuItem) {
      throw new BadRequestError("Menu item not found");
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
      throw new ServerError("Menu item not updated");
    }
    return "Menu item updated successfully";
  };
  static deleteMenuItem = async ({ menu_id }) => {
    const foundMenuItem = await MenuItem.findOne({ where: { id: menu_id } });
    if (!foundMenuItem) {
      throw new BadRequestError("Menu item not found");
    }
    const deletedMenuItem = await MenuItem.destroy({ where: { id: menu_id } });
    if (!deletedMenuItem) {
      throw new BadRequestError("Menu item not deleted");
    }
    return "Menu item deleted successfully";
  };
}

module.exports = menuManageService;
