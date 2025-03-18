import { Router } from "express";
import { signUp,login,logout } from "../controllers/auth.controller.js";

// Create a new router
const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/signup", signUp);

authRouter.post("/logout", logout);

export default authRouter;