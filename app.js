//babel
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Home = require('./src/views/Home').default;
const Secret = require('./src/views/Secret').default;
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./src/middleware/authMiddleware.js')
const cors = require('cors');
const app = express();
app.use(cors());
//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//view engine
// app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//database connection
const dbURI = 'mongodb+srv://anshul:anshul123@jwt.1c8tz4q.mongodb.net/'
const PORT = process.env.PORT || 4000;
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })
    .then((result) => app.listen(PORT))
    .then(console.log(`server is running on port ${PORT}`))
    .catch((err) => console.log(err));

//routes
app.get('http://localhost:3000/', (req, res) => res.render('Home'))
app.get('http://localhost:3000/secret', requireAuth, (req, res) => res.render('Secret'));
// app.use('/auth', authRoutes);

//new routes in jsx:
// app.get('http://localhost:3000/', (req, res) => {
    // const html = ReactDOMServer.renderToString(<Home/>);
    // const html = ReactDOMServer.renderToString(React.createElement(Home));
    // res.send(html);
// });
// app.get('http://localhost:3000/secret', requireAuth, (req, res) => {
    // const html = ReactDOMServer.renderToString(<Secret/>);
    // const html = ReactDOMServer.renderToString(React.createElement(Secret));
    // res.send(html);
// });
app.use(authRoutes);


// app.get('/set-cookies', (req, res) => {
//key value kinda pairs
//set headers for cookie
//can access the cookie in js by document.cookie
//cookie dies iwhen the browser closes i.e. its session ends
// res.cookie('newUser', false);

//can set its expiration time, secure- https only , httponly- cant be accessed from frontend or js, can be accessed by just servers
//     res.cookie('hey', false, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
//     res.send("got cookies");
// });

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// });