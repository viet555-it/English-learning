import db from "../config/db.config.js";

export const findByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
        email,
    ]);
    return rows[0] || null;
};

export const findByUsername = async (username) => {
    const [rows] = await db.query("SELECT * FROM user WHERE username = ?", [
        username,
    ]);
    return rows[0] || null;
};

export const createAccount = async ({ email, username, password_hash }) => {
    const [result] = await db.query(
        "INSERT INTO user (email, username, password_hash) VALUES (?, ?, ?)",
        [email, username, password_hash],
    );
    return { id: result.insertId };
};
