import { describe, jest } from "@jest/globals";
import { findByEmail, findByUsername, createUser } from "./user.service.js";
import db from "../config/db.config.js";

jest.mock("../config/db.config.js", () => ({
    __esModule: true,
    default: {
        query: jest.fn(),
    },
}));

describe("test all function to query db", () => {
    afterEach(() => jest.clearAllMocks());

    describe("findByEmail", () => {
        test("the returned email in the correct form", async () => {
            db.query.mockResolvedValue([
                [
                    {
                        id: 1,
                        email: "a@test.com",
                        username: "a",
                        password_hash: "xxx",
                    },
                ],
                undefined,
            ]);

            const result = await findByEmail("a@test.com");

            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM user WHERE email = ?",
                ["a@test.com"],
            );
            expect(result.email).toBe("a@test.com");
        });

        test("return null if email does not exist in db", async () => {
            db.query.mockResolvedValue([[], undefined]);
            const result = await findByEmail("notfound@test.com");
            expect(result).toBeNull();
        });
    });

    describe("findByUsername", () => {
        test("the returned username in the correct form", async () => {
            db.query.mockResolvedValue([
                [
                    {
                        id: 1,
                        email: "a@test.com",
                        username: "a",
                        password_hash: "xxx",
                    },
                ],
                undefined,
            ]);

            const result = await findByUsername("a");

            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM user WHERE username = ?",
                ["a"],
            );
            expect(result.username).toBe("a");
        });

        test("return null if username does not exist in db", async () => {
            db.query.mockResolvedValue([[], undefined]);
            const result = await findByUsername("notfound");
            expect(result).toBeNull();
        });
    });

    describe("createUser", () => {
        test("return id if user was created successfully", async () => {
            db.query.mockResolvedValue([{ insertId: 1 }, undefined]);

            const result = await createUser({
                email: "a@test.com",
                username: "a",
                passwordHash: "hash123",
            });

            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO user (email, username, password_hash) VALUES (?, ?, ?)",
                ["a@test.com", "a", "hash123"],
            );
            expect(result.id).toBe(1);
        });
    });
});
