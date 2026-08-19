export const validatePassword = (password) => {
    const validLength = password.length >= 8;
    const containCharacters = /[a-zA-Z]/.test(password);
    const containDigits = /\d/.test(password);
    const containSpecialCharacters = "!@#$%^&*";

    return (
        validLength &&
        containCharacters &&
        containDigits &&
        containSpecialCharacters
    );
};

export const validateEmail = (email) => {
    const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return validFormat;
};
