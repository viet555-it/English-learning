import { register } from "./auth.controller";
import supertest from "supertest";

describe("POST: /auth", () => {
    describe("POST: /register", () => {
        describe("give username, email and password", () => {
            test.todo("should register user successfully");
        })

        describe("when username, email and password is missing", () => {
            test.todo("should return validation error");
        })
    });
});
