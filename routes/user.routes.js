import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/" , (req, res) => {
    res.send({message:"GET All Users"}).status(200);
});


userRouter.get("/:id" ,authMiddleware, getUser);


userRouter.post("/" , (req, res) => {    
    res.send({message:"POST New user"}).status(201);
});


userRouter.put("/:id" , (req, res) => {   
    res.send({message:"PUT User by ID"}).status(200);
});

userRouter.delete("/:id" , (req, res) => {  
    res.send({message:"DELETE User by ID"}).status(204);
});

export default userRouter;