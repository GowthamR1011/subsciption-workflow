import jwt from 'jsonwebtoken';
import User  from '../models/users.models.js';
import {JWT_SECRET} from '../config/config.js';

export const authMiddleware = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            const error = new Error("No Token Provided");
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token,JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            const error = new Error("Invalid Token");
            error.statusCode = 401;
            throw error;
        }

        req.user = user;
        next();
    }
    catch(error){
        // const err = new Error({message:"Unauthorized Access",error:error.message})
        // err.status = 401;
        // next(err);
        console.log(error)
        res.status(401).json({message:"Unauthorized Access",error:error.message});
    }
};