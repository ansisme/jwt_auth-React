const User = require('../models/User')
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
//new

// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const path = require('path');
// const fs = require('fs');
const app = express();
//new
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
//
app.use(cors());
app.use(cookieParser());
//error handler function
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
    if (err.message === 'incorrect email') {
        errors.email = ' the  email you entered is not registred';
    }
    if (err.message === 'incorrect password') {
        errors.password = ' the password you entered is incorrect';
    }
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

//max age is in seconds
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'anshul', {
        expiresIn: maxAge
    });
}
module.exports.signup_get = (req, res) => {
        res.render('Signin');
    }
    // module.exports.signup_get = (req, res) => {
    //     const signupPath = path.join(__dirname, '..', 'views', 'Signin.jsx');
    //     const signupComponent = require(signupPath).default;
    //     const html = ReactDOMServer.renderToString( < signupComponent / > );
    //     res.send(html);
    // };
module.exports.login_get = (req, res) => {
        res.render('Login');
    }
    // module.exports.login_get = (req, res) => {
    //     const loginPath = path.join(__dirname, '..', 'views', 'Login.jsx');
    //     const loginComponent = require(loginPath).default;
    //     const html = ReactDOMServer.renderToString( < loginComponent / > );
    //     res.send(html);
    // };
module.exports.signup_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        //creating a user in the database
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (e) {
        const errors = handleErrors(e);
        res.status(400).json({ errors });
    }
}
module.exports.login_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (e) {
        const errors = handleErrors(e);
        res.status(400).json({ errors });
    }
}