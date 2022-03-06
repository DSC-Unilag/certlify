exports.Register = (req, res) => {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body;

    try {} catch (error) {

    }

    res.status(200).json({ firstName, lastName, email, password, passwordConfirmation });
}
