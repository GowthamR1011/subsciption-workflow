import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/" ,authMiddleware, getUser);

userRouter.put("/" , authMiddleware, updateUser);


userRouter.delete("/" , authMiddleware,deleteUser);


// Admin Route for later
// userRouter.get("/:id" , (req, res) => {
//     res.send({message:"GET All Users"}).status(200);
// });




// this is signup function
// userRouter.post("/" , (req, res) => {    
//     res.send({message:"POST New user"}).status(201);
// });




export default userRouter;