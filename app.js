const express = require('express');
const mongoose = require('mongoose');

const app = express();
//midleware
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');


//databse connection
const dbURI = 'mongodb+srv://anshul:anshul123@jwt.1c8tz4q.mongodb.net/'
mongoose.connect(dbURI, {
        userUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//routes
app.get('/', (req, res) => res.render('home'))
app.get('/secret', (req, res) => res.render('secret'));