const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const app = express();
//midleware
app.use(express.static('public'));
app.use(express.json());
//view engine
app.set('view engine', 'ejs');


//database connection
const dbURI = 'mongodb+srv://anshul:anshul123@jwt.1c8tz4q.mongodb.net/'
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err));

//routes
app.get('/', (req, res) => res.render('home'))
app.get('/secret', (req, res) => res.render('secret'));
// app.use('/auth', authRoutes);
app.use(authRoutes);