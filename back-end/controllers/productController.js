import Product from "../models/Products.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Create Product
export const createProduct = catchAsync(async (req, res, next) => {
  const { name, category, purchasePrice, sellingPrice, stock, minStock } = req.body;

  if (!name || !category || purchasePrice == null || sellingPrice == null || stock == null) {
    return next(new AppError("name, category, purchasePrice, sellingPrice, stock are required", 400));
  }

  const product = await Product.create({
    name,
    category,
    purchasePrice,
    sellingPrice,
    stock,
    minStock,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

// Get All Products
export const getProducts = catchAsync(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    results: products.length,
    data: products,
  });
});

// Get Product By ID
export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Update Product
export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Delete Product
export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
