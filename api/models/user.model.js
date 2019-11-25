const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const USER_MODEL = 'User';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your First Name']
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your Last Name']
  },
  email: {
    type: String,
    required: [true, 'Please provide us with email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  address: {
    firstName: {
      type: String,
      // required: [true, 'Please tell us your Address First Name']
    },
    lastName: {
      type: String,
      // required: [true, 'Please tell us your Address Last Name']
    },
    company: {
      type: String
    },
    addressOne: {
      type: String
    },
    addressTwo: {
      type: String
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    postalCode: {
      type: Number,
      // required: [true, 'Please tell us your ZIP/Postal code']
    },
    phone: {
      type: Number
    }
  }
})

userSchema.pre('save', async function(next) {
  // TODO only run this password if password was actyally modified
  // if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model(USER_MODEL, userSchema);

module.exports = User;
