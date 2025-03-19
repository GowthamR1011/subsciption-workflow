import mongoose from "mongoose";
import User from "../models/users.models.js";

export const getUser = async (req, res, next) => {
    try{
        res.status(200).json({ message: "User found", user: req.user });
    }
    catch(error){
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{

        const user = req.user;
        const { name=null, email=null, password=null} = req.body;

        if(name){
            user.name = name;
        }

        if(email){
            user.email = email;
        }

        if(password){
            user.password = password;
        }

        await user.save({session:session});
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({message:"User updated successfully",data:user});


    }catch(error){
        session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try{
        const userId = req.user._id;
        await User.findByIdAndDelete(userId);
        res.status(204).json({message:"User deleted successfully"});
    }
    catch(error){
        next(error);
    }
}

