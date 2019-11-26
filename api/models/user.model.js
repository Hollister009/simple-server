const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const USER_MODEL = 'User';

const addressSchema = new mongoose.Schema({
  company: String,
  addressOne: {
    type: String,
    required: [true, 'Please provide at least one address']
  },
  addressTwo: String,
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  postalCode: { type: Number, required: true },
  phone: { type: Number, required: true }
});

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
    ref: addressSchema,
  }
});

userSchema.pre('save', async (next) => {
  // TODO only run this password if password was actyally modified
  // if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model(USER_MODEL, userSchema);

module.exports = User;
