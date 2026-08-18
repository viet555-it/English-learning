import db from "../config/db.config.js";
import { findByEmail, findByUsername } from "../services/user.service.js";

export const register = async (req, res) => {
    const { email, username, password } = req.body;

    const emailExisting = await findByEmail(email);
    const usernameExisting = await findByUsername(username);

    if (emailExisting) {
        return res.status(400).send({ error: "Email already exist!" });
    }
    if (usernameExisting) {
        return res.status(400).send({ error: "Username already exist!" });
    }
};
