const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const Notification = require("../models/Notification");

// TEST ROUTE
router.post("/test", (req, res) => {

    console.log(req.body);

    res.json(req.body);

});


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { firstName, surname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            firstName,
            surname,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }

        res.status(200).json({

            message: "Login successful",

            user: {
                id: user._id,
                firstName: user.firstName,
                surname: user.surname,
                email: user.email
            }

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

// GET USER NOTIFICATIONS
router.get("/notifications/:userId", async (req, res) => {

    try {

        const notifications = await Notification.find({
            userId: req.params.userId
        }).sort({ createdAt: -1 });

        res.json(notifications);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

// CREATE NOTIFICATION
router.post("/notifications", async (req, res) => {

    try {

        const notification = new Notification(req.body);

        await notification.save();

        res.status(201).json({
            message: "Notification created",
            notification
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

// GET USER DETAILS
router.get("/:userId", async (req, res) => {

    try {

        const user = await User.findById(req.params.userId);

        res.json(user);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

// UNLOCK DISCOUNT
router.put("/unlock-discount/:userId", async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(

            req.params.userId,

            {
                discountUnlocked: true
            },

            {
                new: true
            }

        );

        res.json(updatedUser);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;