import express from "express";
import userRoutes from "./userRoutes.js"

const router = express();


router.use("/user", userRoutes);

export default router;
