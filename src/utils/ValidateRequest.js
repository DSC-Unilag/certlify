/**
 * Validates request body using a set of rules
 * @param req Request body, req.body
 * @param rules Array of required fields
 * @return {{body: {}, errors: string}} Required fields and errors
 * @example
 const { body, errors } = ValidateRequest(req.body, [
    'username',
    'last_name',
    'email',
    'password',
    'password_confirmation'
 ]);

 let username = body.username
 @example
 const { body, errors } = ValidateRequest(req.body, [
    {
        first_name: 'string' // Checks if request has first_name and that it is a string
    },
    'last_name',
 ]);
 */
exports.ValidateRequest = (req, rules) => {
    let body = {};
    let errors = '';

    rules.forEach((rule) => {
        switch (typeof rule) {
            case "string":
                if (req[rule]) body[rule] = req[rule];
                else {
                    if (errors) errors += rule + ', ';
                    else errors = 'Missing required fields: ' + rule + ', ';
                }

                break;
            case "object":
                if (req[Object.keys(rule)[0]]) body[Object.keys(rule)[0]] = req[Object.keys(rule)[0]];
                else {
                    if (errors) errors += Object.keys(rule)[0] + ', ';
                    else errors = 'Missing required fields: ' + Object.keys(rule)[0] + ', ';
                }

                break;
            default:
                throw new Error("Invalid rule object.");
        }
    })

    return {
        errors: errors.substring(0, errors.length - 2) + ".",
        body
    }
}
