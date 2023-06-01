const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if the token exits and is verified
    if (token) {
        jwt.verify(token, 'anshul', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('http://localhost:3000/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('http://localhost:3000/login');
    }
}

module.exports = { requireAuth };