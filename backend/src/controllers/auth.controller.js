import db from "../config/db.config.js";
import {
    findByEmail,
    findByUsername,
    createUser,
} from "../services/user.service.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { email, username, password } = req.body;

    const emailExisting = await findByEmail(email);
    const usernameExisting = await findByUsername(username);

    if (emailExisting && usernameExisting) {
        return res
            .status(400)
            .send({ error: "Email and Username already exist!" });
    }
    if (emailExisting) {
        return res.status(400).send({ error: "Email already exist!" });
    }
    if (usernameExisting) {
        return res.status(400).send({ error: "Username already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await createUser({ email, username, passwordHash });

    res.status(201).send({
        id: result.id,
        message: "user register successfully",
    });
};
