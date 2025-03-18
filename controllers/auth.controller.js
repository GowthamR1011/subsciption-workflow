import mongoose from "mongoose";
import User from "../models/users.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/config.js";


export const signUp = async (req, res,next) => {
  // Signup logic
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create a new user
        const {name,email,password} = req.body;

        const existingUser = await User
            .findOne({ email: email })
            .session(session);
        
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create(
            [{name,email,password:hashedPassword}],
            { session: session }
        );

        await session.commitTransaction();
        session.endSession();
        
        const token = jwt.sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "User created successfully", user: newUser[0] });


    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const login = async (req, res,next) => {
  // Login logic
   
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email:email});
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Logged in successfully", user: user });
    }
    catch(error){
        next(error);
    }
};

export const logout = async (req, res) => {
  // Logout logic
    try{
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    }catch(error){
        next(error);
    }
};