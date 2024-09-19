// check username, password in post (login) request (req.body)
// if they both exist, create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");

const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  //mongoose validation
  //Joi validation
  // check in the controller
  if (!username || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  const user = req.user;

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    message: `Hello, ${user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
