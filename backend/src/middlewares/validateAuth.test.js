import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { validateRegisterInput } from "./validateAuth.js";

describe("validateRegisterInput middleware", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    describe("Missing fields", () => {
        test("should return 400 if req.body is undefined", () => {
            req.body = undefined;

            validateRegisterInput(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Missing email, username, or password!",
            });
            expect(next).not.toHaveBeenCalled();
        });

        test("should return 400 if email is missing", () => {
            req.body = {
                username: "testuser",
                password: "Password123@",
            };

            validateRegisterInput(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Missing email, username, or password!",
            });
            expect(next).not.toHaveBeenCalled();
        });

        test("should return 400 if username is missing", () => {
            req.body = {
                email: "test@example.com",
                password: "Password123@",
            };

            validateRegisterInput(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Missing email, username, or password!",
            });
            expect(next).not.toHaveBeenCalled();
        });

        test("should return 400 if password is missing", () => {
            req.body = {
                email: "test@example.com",
                username: "testuser",
            };

            validateRegisterInput(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Missing email, username, or password!",
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("Invalid format", () => {
        test("should return 400 if email format is invalid", () => {
            req.body = {
                email: "invalid-email-format",
                username: "testuser",
                password: "Password123@",
            };

            validateRegisterInput(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Invalid Email!",
            });
            expect(next).not.toHaveBeenCalled();
        });

        test("should return 400 if password format is invalid (< 8 chars or missing numbers/letters)", () => {
            req.body = {
                email: "test@example.com",
                username: "testuser",
                password: "123", // Quá ngắn
            };

            validateRegisterInput(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Invalid Password!",
            });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("Valid input", () => {
        test("should call next() when all inputs are valid", () => {
            req.body = {
                email: "test@example.com",
                username: "testuser",
                password: "Password123@",
            };

            validateRegisterInput(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.send).not.toHaveBeenCalled();
        });
    });
});