import { checkAuth, signUp, signin } from "../controllers/auth.controller.js";

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";


const authRouter = express.Router();

authRouter.post("/signup", signUp)

authRouter.post("/signin", signin)
authRouter.get("/check", protectRoute, checkAuth)
authRouter.post("/signout", protectRoute, (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Signed out successfully" });
    } catch (error) {
        console.error("Error in signout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default authRouter
