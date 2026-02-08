import Invoice from "../models/Invoices.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const calculateSubTotal = (items = []) => {
  return items.reduce((sum, item) => {
    const itemTotal =
      typeof item.total === "number"
        ? item.total
        : (item.qty || 0) * (item.price || 0);
    return sum + itemTotal;
  }, 0);
};

// Create Invoice
export const createInvoice = catchAsync(async (req, res, next) => {
  const {
    invoiceNumber,
    items = [],
    subTotal,
    discount = 0,
    tax = 0,
    finalTotal,
    paymentMethod,
    cashier,
    customer,
  } = req.body;

  if (!invoiceNumber) {
    return next(new AppError("Invoice number is required", 400));
  }

  const computedSubTotal = typeof subTotal === "number" ? subTotal : calculateSubTotal(items);
  const computedFinalTotal =
    typeof finalTotal === "number" ? finalTotal : computedSubTotal - discount + tax;

  const invoice = await Invoice.create({
    invoiceNumber,
    items,
    subTotal: computedSubTotal,
    discount,
    tax,
    finalTotal: computedFinalTotal,
    paymentMethod,
    cashier,
    customer: customer || null,
  });

  res.status(201).json({
    success: true,
    data: invoice,
  });
});

// Get All Invoices
export const getInvoices = catchAsync(async (req, res) => {
  const invoices = await Invoice.find()
    .sort({ createdAt: -1 })
    .populate("cashier", "name email role")
    .populate("customer", "name email points");

  res.status(200).json({
    success: true,
    results: invoices.length,
    data: invoices,
  });
});

// Get Invoice By ID
export const getInvoiceById = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate("cashier", "name email role")
    .populate("customer", "name email points");

  if (!invoice) {
    return next(new AppError("Invoice not found", 404));
  }

  res.status(200).json({
    success: true,
    data: invoice,
  });
});

// Update Invoice
export const updateInvoice = catchAsync(async (req, res, next) => {
  const updateData = { ...req.body };

  if (updateData.items && !updateData.subTotal) {
    updateData.subTotal = calculateSubTotal(updateData.items);
  }

  if (
    (typeof updateData.subTotal === "number" || updateData.items) &&
    typeof updateData.finalTotal !== "number"
  ) {
    const discount = typeof updateData.discount === "number" ? updateData.discount : 0;
    const tax = typeof updateData.tax === "number" ? updateData.tax : 0;
    updateData.finalTotal = updateData.subTotal - discount + tax;
  }

  const invoice = await Invoice.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!invoice) {
    return next(new AppError("Invoice not found", 404));
  }

  res.status(200).json({
    success: true,
    data: invoice,
  });
});

// Delete Invoice
export const deleteInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);

  if (!invoice) {
    return next(new AppError("Invoice not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Invoice deleted successfully",
  });
});
