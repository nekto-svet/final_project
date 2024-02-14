import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
    console.log ('from verifytoken all cookies', req.cookies)
    const acsesstoken = req.cookies.token || req.headers['x-access-token'];
    console.log ('from verifytoken', req.cookies.token, req.headers['x-access-token'] );

    if(!acsesstoken) return res.status(401).json({msg:"unauthorized"});
    // 401 = unauthorized

    jwt.verify(acsesstoken, process.env.ACSESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json({err:err.message, msg:'forbidden'});
        console.log(decode);
        next();
    })
};