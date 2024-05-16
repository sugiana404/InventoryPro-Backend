const Supplier = require("../models/supplierModel");
const { createAudit } = require("../utils/auditUtils");
const { NotFoundError } = require("../utils/errorUtils");
const { findUserId } = require("../utils/jwtUtils");

async function addSupplier(name, address, email, phoneNumber, token) {
  const userId = await findUserId(token);
  try {
    const supplier = await Supplier.create({
      name,
      address,
      email,
      phoneNumber,
    });
    await createAudit(
      "CREATE",
      "SUPPLIER",
      userId,
      `${JSON.stringify(supplier)}`
    );
  } catch (error) {
    throw error;
  }
}

async function getSupplier() {
  try {
    const supplier = await Supplier.findAll();
    return supplier;
  } catch (error) {
    throw error;
  }
}

async function getSupplierById(supplierId) {
  try {
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      throw new NotFoundError(`Supplier with ID ${supplierId} is not found.`);
    }
    return supplier;
  } catch (error) {
    throw error;
  }
}

async function updateSupplierData(supplierId, updateFields, token) {
  try {
    const userId = await findUserId(token);
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      throw new NotFoundError(`Supplier with ID ${supplierId} is not found.`);
    }
    const supplierUpdate = await supplier.update(updateFields);
    const keys = Object.keys(updateFields);
    const changesArray = keys.map((key) => {
      const value = updateFields[key];
      return `${key}: ${value};`;
    });
    const changes = changesArray.join(", ");
    await createAudit(
      "UPDATE",
      "SUPPLIER",
      userId,
      `${JSON.stringify(changes)}`
    );
    return supplierUpdate;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addSupplier,
  getSupplier,
  getSupplierById,
  updateSupplierData,
};
