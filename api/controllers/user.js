const User = require("../models/user");
const { generateToken } = require("../utils/generateJwtToken");

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // token
    const token = generateToken(user._id);
    res.ststus(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//signup

const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.singup(email, password);

        // token
        const token = generateToken(user._id_)
            
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser}