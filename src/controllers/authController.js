const User = require('../models/User')

//error handler function
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //handling duplicates error
    if (err.code === 11000) {
        errors.email = 'The email already exists';
        return errors;
    }
    if (err.message.includes('user validation failed')) {
        //object ki value ki property nikal rhe 
        //objects has 2 keys and values: email and password
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })

    }
    return errors;
}
module.exports.signup_get = (req, res) => {
    res.render('signup');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.login_post = (req, res) => {
    res.send('user login');
}
module.exports.signup_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        //creating a user in the database
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (e) {
        const errors = handleErrors(e);
        res.status(400).json({ errors });
    }

}