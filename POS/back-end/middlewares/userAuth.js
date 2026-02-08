import jwt from 'jsonwebtoken'
import User from '../models/User.js'







export const protectUser = async(req,res,next)=>{
    const token = req.cookies.user_token; 
    if(!token) 
        return res.status(401).json({message:"Unauthorized"});
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();

    } catch(err){
        res.status(401).json({message:"invalid token"});

    }

}


export const authorizeUser = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {  // ✅ req.user مش req.admin
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  };
};