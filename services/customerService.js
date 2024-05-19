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
    const added = { name, address, email };
    await createAudit("CREATE", "CUSTOMER", customer.id, userId, {
      id: customer.id,
      added: [added],
    });
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

    const changes = {};
    for (const [key, value] of Object.entries(updateFields)) {
      changes[key] = value;
    }

    await createAudit("UPDATE", "CUSTOMER", customer.id, userId, {
      id: customer.id,
      changes: [changes],
    });

    return customerUpdate;
  } catch (error) {
    console.log(`error: ${error.message}`);
    throw error;
  }
}

module.exports = { addCustomer, updateCustomer };
