import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get("/", protect, getMessages);
router.post("/send/", protect,sendMessage);


export default router;
