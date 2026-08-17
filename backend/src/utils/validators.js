export function validatePassword(password) {
    const validLength = password.length >= 8;
    const containCharacters = /[a-zA-Z]/.test(password);
    const containDigits = /\d/.test(password);

    return validLength && containCharacters && containDigits;
}

export function validateEmail(email) {
    const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return validFormat;
}