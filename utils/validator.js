import passwordValidator from 'joi-password-complexity';

const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
};

const validate = (password) => {
    const { error } = passwordValidator(complexityOptions).validate(password);
    if (error) {
        return {
            valid: false,
            message: error.details[0].message
        };
    }
    return {
        valid: true
    };
};

export { validate };
