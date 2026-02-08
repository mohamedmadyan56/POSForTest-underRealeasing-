import Customer from "../models/Customer.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Create Customer
export const createCustomer = catchAsync(async (req, res, next) => {
  const { name, email, points = 0 } = req.body;

  if (!name) {
    return next(new AppError("Customer name is required", 400));
  }

  const customer = await Customer.create({ name, email, points });

  res.status(201).json({
    success: true,
    data: customer,
  });
});

// Get All Customers
export const getCustomers = catchAsync(async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    results: customers.length,
    data: customers,
  });
});

// Get Customer By ID
export const getCustomerById = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    data: customer,
  });
});

// Update Customer
export const updateCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!customer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    data: customer,
  });
});

// Delete Customer
export const deleteCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
  });
});
