const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'PLease enter the email'],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'PLease enter the email'],
        minlength: [6, 'Please enter password of minimum length of 6 characters']
    },
});

//fire a doc after saving a doc
userSchema.post('save', function(doc, next) {
    console.log('the user was created and saved');
    //you need to call the next functions
    next();

})

//fire a doc before saving it
userSchema.pre('save', async function(next) {
    //hashing before saving
    const salt = await bcrypt.genSalt();
    //this means the instance of the user we are going to create
    this.password = await bcrypt.hash(this.password, salt);
    // console.log('the user about to be created and saved', this.password, );
    next();
})

//static model to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);


module.exports = User;