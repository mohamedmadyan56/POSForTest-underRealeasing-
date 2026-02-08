import Report from "../models/Reports.js";
import Invoice from "../models/Invoices.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Create Report
export const dailyReport = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ضبط الوقت لبداية اليوم الحالي

  try {
    // جلب الفواتير التي تم إنشاؤها منذ بداية اليوم
    const invoices = await Invoice.find({
      createdAt: { $gte: today }
    });

    // حساب إجمالي المبيعات باستخدام reduce
    const totalSales = invoices.reduce((acc, inv) => acc + inv.finalTotal, 0);

    res.json({
      date: today,
      totalSales,
      count: invoices.length // عدد الفواتير اليومية
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تقرير المبيعات لفترة زمنية محددة
export const rangeReport = async (req, res) => {
  const { start, end } = req.body; // استقبال تاريخ البداية والنهاية من الطلب

  try {
    // البحث عن الفواتير بين التاريخين المحددين
    const invoices = await Invoice.find({
      createdAt: { 
        $gte: new Date(start), 
        $lte: new Date(end) 
      }
    });

    // حساب الإجمالي للفترة المحددة
    const total = invoices.reduce((acc, i) => acc + i.finalTotal, 0);

    res.json({
      total,
      count: invoices.length,
      invoices
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const topProducts = async (req, res) => {
  try {
    // استخدام Aggregate لتجميع البيانات من مصفوفة العناصر داخل الفواتير
    const data = await Invoice.aggregate([
      { $unwind: "$items" }, // تفكيك مصفوفة العناصر (items) لمعالجة كل منتج على حدة
      { 
        $group: { 
          _id: "$items.name", // التجميع بناءً على اسم المنتج
          sold: { $sum: "$items.quantity" } // جمع الكميات المباعة لكل منتج
        } 
      },
      { $sort: { sold: -1 } } // ترتيب النتائج من الأكثر مبيعاً للأقل
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};