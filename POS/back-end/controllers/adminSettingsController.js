import Settings from "../models/Settings.js"
import catchAsync from "../utils/catchAsync.js"


export const getSettings = catchAsync(async (req, res, next) => {
  let settings = await Settings.findOne()

 
  if (!settings) {
    settings = await Settings.create({})
  }

  res.status(200).json({
    success: true,
    data: settings,
  })
})

// Update Settings
export const updateSettings = catchAsync(async (req, res, next) => {
  const { storeName, phone, address, taxRate, currency, invoiceFooter, logo } = req.body

  let settings = await Settings.findOne()

  if (!settings) {
    settings = await Settings.create({
      storeName, phone, address, taxRate, currency, invoiceFooter, logo,
    })
  } else {
    settings = await Settings.findByIdAndUpdate(
      settings._id,
      { storeName, phone, address, taxRate, currency, invoiceFooter, logo },
      { new: true, runValidators: true }
    )
  }

  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    data: settings,
  })
})