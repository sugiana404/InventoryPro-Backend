const { UnauthroizedError } = require("../utils/errorUtils");
const { sendSuccessResponse } = require("../utils/responseUtils");

const customerService = require("../services/customerService");
async function addCustomer(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to add customer");
    }
    const { name, address, email } = req.body;
    const token = req.cookies.accessToken;
    const customer = await customerService.addCustomer(
      name,
      address,
      email,
      token
    );
    sendSuccessResponse(res, 201, customer, "Customer added succesfully");
  } catch (error) {
    next(error);
  }
}

async function updateCustomer(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to update customer.");
    }
    const customerId = req.params.id;
    const updateFields = req.body;
    const token = req.cookies.accessToken;
    const customerUpdate = await customerService.updateCustomer(
      customerId,
      updateFields,
      token
    );
    sendSuccessResponse(res, 200, customerUpdate, "Data update succesfully");
  } catch (error) {
    next(error);
  }
}

module.exports = { addCustomer, updateCustomer };
