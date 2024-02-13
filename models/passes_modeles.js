import db from "../config/DB_conect.js";

export const _registerNewPass = (user_id, email, hashed_pass) => {
    return db("passes").insert({
        user_id,
        email,
        hashed_pass
    }, ['user_id', 'email', 'hashed_pass']);
};

export const _login = (email) => {
    return db("passes").select('user_id', 'email', 'hashed_pass').where({email})
};

