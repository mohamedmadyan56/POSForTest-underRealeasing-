import catchAsync from "../utils/catchAsync.js";
import Invoice from "../models/Invoices.js";
import Product from "../models/Products.js";
import Customer from "../models/Customer.js";
import Admin from "../models/Admin.js";

export const getDasthboard = catchAsync(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaySales = await Invoice.aggregate([
    { $match: { createdAt: { $gte: today } } },
    { $group: { _id: null, total: { $sum: "$finalTotal" }, count: { $sum: 1 } } },
  ]);

  const totalProducts = await Product.countDocuments();
  const totalCustomers = await Customer.countDocuments();
  const totalAdmins = await Admin.countDocuments();
  const totalInvoices = await Invoice.countDocuments();

  res.json({
    success: true,
    data: {
      totalAdmins,
      totalInvoices,
      todaySales: todaySales[0]?.total || 0,
      totalProducts,
      totalCustomers,
      todayInvoices: todaySales[0]?.count || 0,
    },
  });
});
