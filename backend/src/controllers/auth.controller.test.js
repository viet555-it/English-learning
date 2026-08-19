import { jest } from "@jest/globals";
import { register } from "./auth.controller";
import supertest from "supertest";
import app from "../app.js";
import {
    findByEmail,
    findByUsername,
    createUser,
} from "../services/user.service.js";
import bcrypt from "bcrypt";

jest.mock("../services/user.service.js", () => ({
    __esModule: true,
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    createUser: jest.fn(),
}));

describe("POST: /auth", () => {
    describe("POST: /register", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        describe("give username, email and password", () => {
            test("return 201 if user was created successfully", async () => {
                findByEmail.mockResolvedValue(null);
                findByUsername.mockResolvedValue(null);
                createUser.mockResolvedValue({
                    id: 1,
                    email: "test@example.com",
                });
                const payload = {
                    email: "test@example.com",
                    username: "testuser",
                    password: "Password123@",
                };
                const res = await supertest(app)
                    .post("/api/auth/register")
                    .send(payload);
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual({
                    id: 1,
                    message: "user register successfully",
                });
                // Verify password đã được hash khi gửi vào createUser
                expect(createUser).toHaveBeenCalledWith(
                    expect.objectContaining({
                        email: payload.email,
                        username: payload.username,
                        passwordHash: expect.any(String),
                    }),
                );
                const passedHash = createUser.mock.calls[0][0].passwordHash;
                expect(passedHash).not.toBe(payload.password);
                expect(await bcrypt.compare(payload.password, passedHash)).toBe(
                    true,
                );
            });

            test("return 400 if email already exist", async () => {
                findByEmail.mockResolvedValue({
                    id: 2,
                    email: "test@example.com",
                });
                findByUsername.mockResolvedValue(null);
                const payload = {
                    email: "test@example.com",
                    username: "testuser",
                    password: "Password123@",
                };
                const res = await supertest(app)
                    .post("/api/auth/register")
                    .send(payload);

                expect(res.statusCode).toBe(400);
                expect(res.body.error).toBe("Email already exist!");
            });

            test("return 400 if username already exist", async () => {
                findByEmail.mockResolvedValue(null);
                findByUsername.mockResolvedValue({
                    id: 2,
                    username: "testuser",
                });
                const payload = {
                    email: "test@example.com",
                    username: "testuser",
                    password: "Password123@",
                };
                const res = await supertest(app)
                    .post("/api/auth/register")
                    .send(payload);

                expect(res.statusCode).toBe(400);
                expect(res.body.error).toBe("Username already exist!");
            });

            test("return 400 if email and username already exist", async () => {
                findByEmail.mockResolvedValue({
                    id: 2,
                    username: "testuser",
                    email: "test@example.com",
                });
                findByUsername.mockResolvedValue({
                    id: 2,
                    username: "testuser",
                    email: "test@example.com",
                });
                const payload = {
                    email: "test@example.com",
                    username: "testuser",
                    password: "Password123@",
                };
                const res = await supertest(app)
                    .post("/api/auth/register")
                    .send(payload);

                expect(res.statusCode).toBe(400);
                expect(res.body.error).toBe("Email and Username already exist!");
            });
        });

        describe("when username, email and password is missing", () => {
            test("return 400 if one field is missing", async () => {
                const res = await supertest(app).post("/api/auth/register");

                expect(res.statusCode).toBe(400);
            });
        });
    });
});
