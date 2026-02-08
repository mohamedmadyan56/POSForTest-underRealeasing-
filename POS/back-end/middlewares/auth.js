import jwt from 'jsonwebtoken'
import User from "../models/User.js"


export const protect = async (req,res,next)=>{
    const token = req.cookies.token 
    if(!token) 
        return res.status(401).json({message:"Unauthroized , no token"})


    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }catch(err){
        res.status(401).json({message:"invalid token"})
    }
}



export const authorize = (...roles) => {
  return (req, res, next) => {
    // التأكد إذا كان دور المستخدم موجود ضمن الأدوار المسموح لها
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};
