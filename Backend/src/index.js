import dotenv from 'dotenv';
import { pool } from './db/db.js';
import { app } from './app.js';

dotenv.config();

pool.connect()
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("Database connection failed !!! ", err);
    });

export default function handler(req, res) {
    return app(req, res);
}