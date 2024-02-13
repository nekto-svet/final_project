import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
    const acsesstoken = req.cookies.token || req.headers['x-access-token'];
    console.log ('from verifytoken', req.cookies.cookies, req.headers['x-access-token'] );

    if(!acsesstoken) return res.status(401).json({msg:"unauthorized"});
    // 401 = unauthorized

    jwt.verify(acsesstoken, process.env.ACSESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json({err:err.message, msg:'forbidden'});
        console.log(decode);
        next();
    })
};