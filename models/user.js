const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});

// static method to login user
userSchema.statics.login = async function(checks, password) {
  const user = await this.findOne(checks);
  if (user) {
    if (user.password === password) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username or email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;