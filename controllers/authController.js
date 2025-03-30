const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey"; 

// Реєстрація
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Користувач вже існує" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

// Логін
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Невірний email або пароль" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Невірний email або пароль" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token

    if (!token) return res.status(403).send('A token is required for authentication');
    
    const userPayload = jwt.verify(token, JWT_SECRET);

    // get user from DB
    const userRecord = await User.findOne({ _id: userPayload.id });

    if (!userRecord) return res.status(401).send('User not found');

    req.user = userRecord;

    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(403).send(error);
  }
};