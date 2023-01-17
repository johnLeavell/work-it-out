const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});

//static signup method
UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hast = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", UserSchema);
