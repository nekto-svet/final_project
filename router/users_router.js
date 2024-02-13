import express from 'express';
import { registerNewUser, login } from '../controller/users_controller.js';
import { verifytoken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', login);
router.get('/verify', verifytoken, (req,res)=> {
    res.sendStatus(200);
})
// router.get('/token',)

export default router;