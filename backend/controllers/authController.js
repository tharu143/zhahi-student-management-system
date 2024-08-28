const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const User = require("../models/User");
    const bcrypt = require("bcryptjs");

    exports.register = async (req, res) => {
      const { email, password, role } = req.body;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ msg: "Server error" });
      }
    };

    exports.login = async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        // For simplicity, return user details without token
        res.json({
          msg: "Logged in successfully",
          user: {
            email: user.email,
            role: user.role,
          },
        });
      } catch (err) {
        res.status(500).json({ msg: "Server error" });
      }
    };

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Here, you would typically return a JWT token, but we'll skip it for now
    res.json({ msg: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
