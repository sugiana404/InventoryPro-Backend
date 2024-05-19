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
    const added = {
      name,
      address,
      email,
      phoneNumber,
    };
    await createAudit("CREATE", "SUPPLIER", supplier.id, userId, {
      id: supplier.id,
      added: [added],
    });
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

    const changes = {};
    for (const [key, value] of Object.entries(updateFields)) {
      changes[key] = value;
    }

    await createAudit("UPDATE", "SUPPLIER", supplier.id, userId, {
      id: supplier.id,
      changes: [changes],
    });
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
