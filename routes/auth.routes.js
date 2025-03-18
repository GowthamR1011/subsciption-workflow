import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
  // login logic
  res.send({"message":"Login route"}).status(200);
});

authRouter.post("/signup", (req, res) => {
  // signup logic
  res.send({"message":"Signup route"}).status(201);
});

authRouter.get("/logout", (req, res) => {
  // logout logic
  res.send({"message":"Logout route"}).status(200);
}
);

export default authRouter;