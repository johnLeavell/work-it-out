const User = require("../models/user");
const { generateToken } = require("../utils/generateJwtToken");

const handleResponse = (res, statusCode, payload) =>
  res.status(statusCode).json(payload);

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    handleResponse(res, 200, { email, token });
  } catch (error) {
    handleResponse(res, 400, { error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = generateToken(user._id);
    handleResponse(res, 200, { email, token });
  } catch (error) {
    handleResponse(res, 400, { error: error.message });
  }
};

module.exports = { signupUser, loginUser };
