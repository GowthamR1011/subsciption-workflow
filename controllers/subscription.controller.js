import Subscription from '../models/subscriptions.models.js';
import mongoose from 'mongoose';


export const createSubscription = async (req, res,next) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{
        
        const user = req.user;

        const newSubscription = await Subscription.create([{...req.body,user:user._id}],{session:session});
        await session.commitTransaction();

        session.endSession();
        res.status(201).json({message:"Subscription created successfully",subscription:newSubscription});

    }catch(error){
        session.abortTransaction();
        session.endSession();
        next(error);
    }
}


export const getUserSubscriptions = async (req, res,next) => {
    try{
        const user = req.user;
        const subscriptions = await Subscription.find({user:user._id});
        res.status(200).json({message:"success",data:subscriptions});
    }catch(error){
        next(error);
    }
}

export const getSubscriptionById = async (req, res,next) => {
    try{
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findById(subscriptionId);

        if(!subscription){ 
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error("Unauthorized Access");
            error.statusCode = 401;
            throw error;

        }

        res.status(200).json({message:"success",data:subscription});
        
    }catch(error){
        next(error);
    }
}


export const updateSubscription = async (req, res,next) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const subscriptionId = req.params.id;
        const {name,price,startDate,endDate,currency = "USD",frequency="monthly",paymentMethod="card",status="active",renewalDate=null} = req.body;

        const subscription = await Subscription.findById(subscriptionId);
        if(!subscription){ 
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error("Unauthorized Access");
            error.statusCode = 401;
            throw error;

        }

        subscription.name = name;
        subscription.price = price;
        subscription.startDate = startDate;
        subscription.endDate = endDate;
        subscription.currency = currency;
        subscription.frequency = frequency;
        subscription.paymentMethod = paymentMethod;
        subscription.status = status;
        if (renewalDate)
            subscription.renewalDate = renewalDate;
        

        await subscription.save({session:session});
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({message:"Subscription updated successfully",data:subscription});

    }catch(error){
        session.abortTransaction();
        session.endSession();
        next(error);
    }
}


export const cancelSubscription = async (req, res,next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const subscriptionId = req.params.id;

        const subscription =   await Subscription.findById(subscriptionId);
        if(!subscription){ 
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error("Unauthorized Access");
            error.statusCode = 401;
            throw error;

        }

        subscription.status = "cancelled";
        await subscription.save({session:session});
        await session.commitTransaction();
        session.endSession(); 

        res.status(200).json({message:"Subscription cancelled successfully",data:subscription});
    
    }catch(error){  
        session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const deleteSubscription = async (req, res,next) => {
    try{
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findById(subscriptionId);

        if(!subscription){ 
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error("Unauthorized Access");
            error.statusCode = 401;
            throw error;

        }

        await Subscription.findByIdAndDelete(subscriptionId);
        res.status(200).json({message:"Subscription deleted successfully"});
    }catch(error){
        next(error);
    }
}