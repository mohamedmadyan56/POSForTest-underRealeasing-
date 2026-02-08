import Transaction from "../models/Transaction.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"


export const createTransaction = catchAsync(async (req, res, next) => {
//                                ✅ catchAsync

  const { type, amount, description, category, invoice } = req.body
//              ✅ amount, description (فيه comma!)

  if (!type || !amount || !description) {
    return next(new AppError("Please provide type, amount and description", 400))
  }

  const transaction = await Transaction.create({
//                          ✅ Transaction (T كبيرة = الـ Model!)
    type,
    amount,
    description,
    category,
    invoice,
    createdBy: req.user._id,
  })

  res.status(201).json({
    success: true,
    data: transaction,
  })
})



//2) Get AllTransactions 

export const getAllTransactions = catchAsync(async(req,res,next)=>{
    const transactions = await Transaction.find().sort({createdAt:-1}).populate("invoice","invoiceNumber finalTotal")
    .populate("createdBy","name");
       if (!transactions){
            return next(new AppError("transaction not found",404));
        }
        res.status(200).json({
            success:true,
            data:transactions,
            result:transactions.length,
        
        })
})




export const getTransactionById = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id)
    .populate("invoice", "invoiceNumber finalTotal")
    .populate("createdBy", "name")

  if (!transaction) {
    return next(new AppError("Transaction not found", 404))
  }

  res.status(200).json({
    success: true,
    data: transaction,
  })
})




export const updateTransaction = catchAsync(async (req, res, next) => {
  const { type, amount, description, category } = req.body

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    { type, amount, description, category },
    { new: true, runValidators: true }
  )

  if (!transaction) {
    return next(new AppError("Transaction not found", 404))
  }

  res.status(200).json({
    success: true,
    data: transaction,
  })
})
export const deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id)

  if (!transaction) {
    return next(new AppError("Transaction not found", 404))
  }

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  })
})