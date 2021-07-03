/**
 * Formats errors as human readable json
 * @param error Error object or empty object incase of incorrect password
 * @param incorrectEmail boolean
 * @returns errors as json
 */
export function sendAuthError (error, incorrectPassword) {
    let errors = {
        email: '',
        password: '',
        name: '',
        others: ''
    };

    if (incorrectPassword) {
        errors['password'] = "Incorrect Password";
        const { others, ...errorMore } = errors;
        return errorMore;
    }

    if (notLoggedIn) {
        errors['email'] = "Please Log In To Continue";
        const { others, ...errorMore } = errors;
        return errorMore;
    }

    if (error) {

        if (error.message.includes('User validation failed')) {
            Object.values(error.errors).forEach((singleError) => {
                const errorType = singleError.properties.path;
                errors[errorType === 'email' ? 'email' : 'others'] = singleError.properties.message;
                errors[errorType === 'password' ? 'password' : 'others'] = singleError.properties.message;
                errors[errorType === 'name' ? 'name' : 'others'] = singleError.properties.message;
            })
        };

        if (error.code === 11000) {
            errors['email'] = "Email is in use already";
        }
    }

    const { others, ...errorMore } = errors;

    return errorMore;
};
