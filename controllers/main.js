// check username, password in post (login) request (req.body)
// if they both exist, create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  //mongoose validation
  //Joi validation
  // check in the controller
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError(
      "Invalid credentials to valid this route: No token provided",
      401
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      message: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorize  to access this route", 401);
  }
};

module.exports = { login, dashboard };
