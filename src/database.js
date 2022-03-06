import pg from 'pg';
const { Pool } = pg;


const user = 'postgres';
const password = 'Miao1109';
const host = 'localhost';
const port = 5432;
const database = 'boardcamp';


const connection = new Pool({
    // connectionString: process.env.DATABASE_URL,
    user,
    password,
    host,
    port,
    database

})

export default connection;