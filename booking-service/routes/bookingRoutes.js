const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");


// CREATE BOOKING
router.post("/create", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET CURRENT BOOKINGS
router.get("/current/:userId", async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.params.userId,
            status: "Current"
        });

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET PAST BOOKINGS
router.get("/past/:userId", async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.params.userId,
            status: "Past"
        });

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;