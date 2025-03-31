import validator from 'validator'

export function validateUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 20;
}

export function validatePassword(password: string): boolean {
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    });
}

export function validateEmail(email: string): boolean {
    return validator.isEmail(email);
}