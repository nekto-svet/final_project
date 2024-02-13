import db from "../config/DB_conect.js";

export const _registerNewUser = (username, email, first_name, last_name) => {
    return db("users") 
        .insert({
            username, 
            email, 
            first_name, 
            last_name
        })
        .returning('user_id');
};

// export const login = (email) => {
//     return db("users").select('id', 'email', 'password').where({email})
// }

// export const all = () => {
//     return db("users").select('id', 'email', 'password').orderBy('id');
// }