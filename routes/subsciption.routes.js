import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createSubscription,
    getUserSubscriptions,
    getSubscriptionById } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/" ,authMiddleware, getUserSubscriptions);

subscriptionRouter.get("/upcoming-renewals" , (req, res) => {
    res.send({message:"Upcoming Subcription Renewals"}).status(200);
});

subscriptionRouter.get("/:id" ,authMiddleware, getSubscriptionById);

subscriptionRouter.post("/" ,authMiddleware, createSubscription);

subscriptionRouter.put("/:id" , (req, res) => {
    res.send({message:"PUT Subscription by ID"}).status(200);
});

subscriptionRouter.delete("/:id" , (req, res) => {
    res.send({message:"DELETE Subscription by ID"}).status(204);
});




subscriptionRouter.get("/users/:id" , (req, res) => {
    res.send({message:"GET all subscriptions by User ID"}).status(200);
});

subscriptionRouter.put("/:id/cancel" , (req, res) => {
    res.send({message:"Cancel Subscription by ID"}).status(200);
});



export default subscriptionRouter;