import dotenv from 'dotenv';
import { pool } from './db/db.js';
import { app } from './app.js';

dotenv.config();

pool.connect()
    .then(() => {
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("Database connection failed !!! ", err);
    });