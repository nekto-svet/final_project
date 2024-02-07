import knex from 'knex';
import 'dotenv/config';

const db = knex({
    client: 'pg',
    connection: {
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
    }
})

export default db;