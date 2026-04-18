import { pool } from '../db/db.js'


const createUser = async ({name, email, phone, password}) => {
    const query = `INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone, currency, created_at`;
    const values = [name, email, phone, password];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1 AND is_active = TRUE`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
}

const findUserById = async (id) => {
    const query = `SELECT * FROM users WHERE id = $1 AND is_active = TRUE`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

const updateUser = async (id, { name, email, phone, currency }) => {
    const query = `UPDATE users SET name = $2, email = $3, phone = $4, currency = $5 WHERE id = $1 RETURNING id, name, email, phone, currency, updated_at`;
    const values = [id, name, email, phone, currency];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const updatePassword = async (id, password) => {
    const query = `UPDATE users SET password = $2 WHERE id = $1 RETURNING id, updated_at`;
    const values = [id, password];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const deactivateUser = async (id) => {
    const query = `DELETE FROM users WHERE id = $1 RETURNING id`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

export {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    updatePassword,
    deactivateUser,
}