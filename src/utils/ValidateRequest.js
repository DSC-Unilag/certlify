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
