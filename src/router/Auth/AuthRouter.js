import express from "express";
import CreateSeasion from "../../Auth/CreateSeasion.js";
import verifyToken from "../../Auth/Verifytoken.js";
const { createToken,logout} = CreateSeasion;
const router = express.Router();
router.post("/create/session", createToken);
router.get('/logout',verifyToken,logout);

export default router;
