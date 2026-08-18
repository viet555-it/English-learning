import { validateEmail, validatePassword } from "../services/auth.service.js";

export function validateRegisterInput(req, res, next) {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
        res.status(400).send({ error: "Invalid Email!"})
    }
    if (!validatePassword(password)) {
        res.status(400).send({ error: "Invalid Password!"});
    }

    next();
}