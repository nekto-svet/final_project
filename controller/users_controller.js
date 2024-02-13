import { _registerNewPass, _login } from "../models/passes_modeles.js";
import { _registerNewUser } from "../models/user_modeles.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import Cookies from "cookies";
dotenv.config();
export const registerNewUser = async(req, res) => {
    const { username, email, first_name, last_name, password } = req.body;
    const lowerEmail = email.toLowerCase();
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);

    try {
        const userRows = await _registerNewUser(username, lowerEmail, first_name, last_name);
        if (userRows.length === 0) {
            return res.status(400).json({ msg: 'Failed to create user' });
        }
        const user_id = userRows[0].user_id;;

        const authRows = await _registerNewPass(user_id, lowerEmail, hash);
        return res.json({ user: { user_id, username, email: lowerEmail, first_name, last_name }});
    } catch (err) {
        console.error('Register', err);
        return res.status(409).json({ msg: 'Email already exists or other error' });
    }
};

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const row = await _login(email.toLowerCase());

        if (row.length === 0){
            return res.status(404).json({msg:'email not found'})
        }

        const match = bcrypt.compareSync(password, row[0].hashed_pass);
        if (!match) return res.status(404).json({msg:'wrong password'});

        const user_id = row[0].user_id;
        const user_email = row[0].email;
        const secret = process.env.ACSESS_TOKEN_SECRET;
        const acsesstoken = jwt.sign({user_id, user_email}, secret, {expiresIn:'5d'});
        console.log ('from users controller', acsesstoken);
        // const cookies = new Cookies(req, res)
        // cookies.set('token', acsesstoken, {
        //     maxAge: 5 * 24 * 60 * 60 * 1000, 
        //     httpOnly: true,
        //     // sameSite: 'None',
        //     // secure: true,
        // })
        res.cookie('token', acsesstoken, {
            maxAge: 5 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });

        // console.log('from users_controller req.cookies', req.cookies.token);
        res.json({token:acsesstoken, user_id});

    } catch(err){
        console.log('login', err);
        res.status(404).json({msg:'something went wrong'})
    }
}


