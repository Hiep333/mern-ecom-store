// định nghĩa route cho user
import express from "express";
const router = express.Router();
import { createUser } from "../controllers/userController.js";

// Định nghĩa route cho user 
router.route('/').post(createUser);

export default router;