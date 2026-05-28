const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");

const axios = require("axios");

// CREATE BOOKING
router.post("/create", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();


        // EVENT-DRIVEN NOTIFICATION
        // Simulate driver search

        setTimeout(async () => {

            try {

                await axios.post(
                    "http://localhost:5001/api/customers/notifications",
                    {
                        userId: booking.userId,
                        message:
                            `Your cab from ${booking.pickupLocation} to ${booking.destinationLocation} is ready for pickup.`
                    }
                );

                console.log("Cab ready notification sent");

            } catch (error) {

                console.log(error.message);

            }

        }, 10000); // (180000) 3 minutes


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
            userId: req.params.userId
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