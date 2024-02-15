import express from 'express';
import { imageFromAI } from "../controller/illustrations_controller.js"
const router = express.Router();

router.post('/', imageFromAI);


export default router;