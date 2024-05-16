const supplierService = require("../services/supplierService");
const { UnauthroizedError } = require("../utils/errorUtils");
const { sendSuccessResponse } = require("../utils/responseUtils");

async function addSupplier(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to add supplier.");
    }
    const { name, address, email, phoneNumber } = req.body;
    const token = req.cookies.accessToken;
    const supplier = await supplierService.addSupplier(
      name,
      address,
      email,
      phoneNumber,
      token
    );
    sendSuccessResponse(res, 201, supplier, "Data added successfully");
  } catch (error) {
    next(error);
  }
}

async function getSupplier(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to get supplier data.");
    }
    const supplier = await supplierService.getSupplier();
    sendSuccessResponse(res, 200, supplier, "Get data success");
  } catch (error) {
    next(error);
  }
}

async function getSupplierById(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to get supplier data.");
    }
    const supplierId = req.params.id;
    const supplier = await supplierService.getSupplierById(supplierId);
    sendSuccessResponse(res, 200, supplier, "Get data success");
  } catch (error) {
    next(error);
  }
}

async function updateSupplierData(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to update data.");
    }
    const supplierId = req.params.id;
    const updateFields = req.body;
    const token = req.cookies.accessToken;
    const supplierUpdate = await supplierService.updateSupplierData(
      supplierId,
      updateFields,
      token
    );
    sendSuccessResponse(res, 200, supplierUpdate, "Update data success");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addSupplier,
  getSupplier,
  getSupplierById,
  updateSupplierData,
};
