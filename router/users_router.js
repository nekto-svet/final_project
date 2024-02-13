import express from 'express';
import { registerNewUser, login } from '../controller/users_controller.js';
import { verifytoken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', login);
router.get('/verify', verifytoken, (req,res)=> {
    res.sendStatus(200);
})
router.get('/token', (req,res)=> {
    const acsesstoken = req.cookies.token; //|| req.headers['x-access-token'];
    if (acsesstoken) {
        res.status(200).json({token:acsesstoken})
    }
    else {
        res.status(404).json({msg:'no token'});
    }
}
    
    )

export default router;