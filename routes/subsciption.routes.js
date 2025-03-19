import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createSubscription,
    getUserSubscriptions,
    getSubscriptionById,
    updateSubscription,
    cancelSubscription,
    deleteSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/" ,authMiddleware, getUserSubscriptions);

subscriptionRouter.get("/upcoming-renewals" , (req, res) => {
    res.send({message:"Upcoming Subcription Renewals"}).status(200);
});

subscriptionRouter.get("/:id" ,authMiddleware, getSubscriptionById);

subscriptionRouter.post("/" ,authMiddleware, createSubscription);

subscriptionRouter.put("/:id" ,authMiddleware, updateSubscription);

subscriptionRouter.delete("/:id" , authMiddleware, deleteSubscription);


subscriptionRouter.put("/:id/cancel" , authMiddleware, cancelSubscription );


// Later with admin role
// subscriptionRouter.get("/users/:id" , (req, res) => {
//     res.send({message:"GET all subscriptions by User ID"}).status(200);
// });



export default subscriptionRouter;