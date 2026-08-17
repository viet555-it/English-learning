import { validatePassword, validateEmail } from "./validators.js";

describe("test validator", () => {
    describe("test validatePassword function", () => {
        test("return false if password is empty", () => {
            expect(validatePassword("")).toBe(false);
        });

        test("return false if password is 8 characters long and contains digits but no other characters", () => {
            expect(validatePassword("12345678")).toBe(false);
        });

        test("return false if password is 8 characters long and contains characters but no other digits", () => {
            expect(validatePassword("abcjjscb")).toBe(false);
            expect(validatePassword("abcjjaBA")).toBe(false);
        });

        test("return false if password is not 8 characters", () => {
            expect(validatePassword("a1")).toBe(false);
        });

        test("Returns true if the password is 8 characters long and contains both letters and numbers.", () => {
            expect(validatePassword("1234567a")).toBe(true);
            expect(validatePassword("1234567A")).toBe(true);
            expect(validatePassword("12345abC")).toBe(true);
        });
    });

    describe("test valideEmail", () => {
        test("return false if email is empty", () => {
            expect(validateEmail("")).toBe(false);
        })

        test("return false if email does not contains @", () => {
            expect(validateEmail("abc.cc")).toBe(false);
            expect(validateEmail("abc")).toBe(false);
        })

        test("return false if email does not contain .", () => {
            expect(validateEmail("abc@mmm")).toBe(false);
            expect(validateEmail("abc")).toBe(false);
        })

        test("return false if email contains both @ and . but no in the correct order", () => {
            expect(validateEmail("abc.com@gmail")).toBe(false);
            expect(validateEmail("a.combc@ga")).toBe(false);
            expect(validateEmail("@gmailabc.csam")).toBe(false);
        })

        test("return true if email contains both @ and . in the correct order", () => {
            expect(validateEmail("abc@gmail.com")).toBe(true);
            expect(validateEmail("abc@ga.com")).toBe(true);
            expect(validateEmail("abc@gmail.csam")).toBe(true);
        })
    });
});
