const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});

// static signup method
UserSchema.statics.signup = async function (email, password) {
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must contain at least 8 characters, including a number and a symbol");
  }

  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
