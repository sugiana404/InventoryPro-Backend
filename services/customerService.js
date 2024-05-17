const Customer = require("../models/customerModel");
const { createAudit } = require("../utils/auditUtils");
const { NotFoundError } = require("../utils/errorUtils");
const { findUserId } = require("../utils/jwtUtils");

async function addCustomer(name, address, email, token) {
  const userId = await findUserId(token);
  try {
    const customer = await Customer.create({
      name,
      address,
      email,
    });
    await createAudit(
      "CREATE",
      "CUSTOMER",
      userId,
      `${JSON.stringify(customer)}`
    );
    return customer;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
}

async function updateCustomer(customerId, updateFields, token) {
  const userId = await findUserId(token);
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      throw new NotFoundError(`Customer with ID ${customerId} is not found`);
    }
    const customerUpdate = await customer.update(updateFields);
    const keys = Object.keys(updateFields);
    const changesArray = keys.map((key) => {
      const value = updateFields[key];
      return `${key}: ${value}`;
    });
    const changes = changesArray.join(", ");
    console.log(`changes: ${changes}`);
    await createAudit(
      "UPDATE",
      "CUSTOMER",
      userId,
      `${JSON.stringify(changes)}`
    );
    return customerUpdate;
  } catch (error) {
    console.log(`error: ${error.message}`);
    throw error;
  }
}

module.exports = { addCustomer, updateCustomer };
