import express from 'express';
import { sendWelcomeMessages } from '../controllers/botWelcome.controller.js';
import protect from "../middleware/protect.js";

const router = express.Router();

router.post('/send-welcome-messages',  protect,sendWelcomeMessages);

export default router;