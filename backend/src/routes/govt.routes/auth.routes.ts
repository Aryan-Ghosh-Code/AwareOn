import express from 'express';
import { login, logout, signup } from '../../controllers/govt.controllers/auth.controller';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout/:id", logout);

export default router;