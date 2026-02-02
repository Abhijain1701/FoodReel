const userModel = require("../models/user.model");
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    try {
        console.log("Register request received");
        console.log("Body:", req.body);

        const { fullName, email, password } = req.body;

        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        // Set cookie and respond
        res.cookie("token", token, { httpOnly: true });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

// Logout User
const logoutUser = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "User logged out successfully"
    });
};

// Register Food Partner
const registerFoodPartner = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const existingPartner = await foodPartnerModel.findOne({ email });
        if (existingPartner) {
            return res.status(400).json({
                message: "Food partner account already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            name,
            password: hashedPassword,
            email,
            phone,
            address
        });

        const token = jwt.sign(
            { id: foodPartner._id },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name,
                address: foodPartner.address,
                phone: foodPartner.phone
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};

// Login Food Partner
const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foodPartner = await foodPartnerModel.findOne({ email });
        if (!foodPartner) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password or email"
            });
        }

        const token = jwt.sign(
            { id: foodPartner._id },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "You logged in successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

// Logout Food Partner
const logoutFoodPartner = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Food partner logged out successfully"
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};
