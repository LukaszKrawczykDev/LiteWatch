const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
    );
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already exists" });

        const newUser = new User({ username, email, password });
        await newUser.save();
        const token = generateToken(newUser);
        res.status(201).json({
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration error", error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user);

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login error", error: err.message });
    }
};