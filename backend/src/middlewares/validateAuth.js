import { validateEmail, validatePassword } from "../utils/validators.js";

export function validateRegisterInput(req, res, next) {
    const { email, username, password } = req.body || {};

    if (!email || !username || !password) {
        return res.status(400).send({ error: "Missing email, username, or password!" });
    }

    if (!validateEmail(email)) {
        return res.status(400).send({ error: "Invalid Email!" });
    }
    if (!validatePassword(password)) {
        return res.status(400).send({ error: "Invalid Password!" });
    }

    next();
}