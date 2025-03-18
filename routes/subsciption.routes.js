import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/" , (req, res) => {
    res.send({message:"GET All Subscriptions"}).status(200);
});


subscriptionRouter.get("/:id" , (req, res) => {
    res.send({message:"GET Subscription by ID"}).status(200);
});

subscriptionRouter.post("/" , (req, res) => {
    res.send({message:"POST New Subscription"}).status(201);
});

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

subscriptionRouter.get("/:id/upcoming-renewals" , (req, res) => {
    res.send({message:"Upcoming Subcription Renewals"}).status(200);
});


export default subscriptionRouter;