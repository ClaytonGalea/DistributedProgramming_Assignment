const express = require("express");
const router = express.Router();

const Payment = require("../models/Payment");

const axios = require("axios");


// PROCESS PAYMENT
router.post("/pay", async (req, res) => {

    try {

        const {
            bookingId,
            userId,
            cabFare,
            cabType,
            bookingTime,
            passengers,
            discountUnlocked
        } = req.body;


        // CAB MULTIPLIER
        let cabMultiplier = 1;

        if (cabType === "Premium") {
            cabMultiplier = 1.2;
        }

        if (cabType === "Executive") {
            cabMultiplier = 1.4;
        }


        // DAYTIME MULTIPLIER
        let daytimeMultiplier = 1;

        const hour = parseInt(bookingTime.split(":")[0]);

        if (hour >= 0 && hour < 8) {
            daytimeMultiplier = 1.2;
        }


        // PASSENGER MULTIPLIER
        let passengerMultiplier = 1;

        if (passengers >= 5 && passengers <= 8) {
            passengerMultiplier = 2;
        }

        if (passengers > 8) {

            return res.status(400).json({
                message: "Maximum passengers exceeded"
            });

        }


        // DISCOUNT MULTIPLIER
        let discountMultiplier = 1;

        if (discountUnlocked) {
            discountMultiplier = 0.9;
        }


        // TOTAL PRICE
        const totalPrice =
            cabFare *
            cabMultiplier *
            daytimeMultiplier *
            passengerMultiplier *
            discountMultiplier;


        // SAVE PAYMENT
        const payment = new Payment({

            bookingId,
            userId,

            cabFare,

            cabMultiplier,
            daytimeMultiplier,
            passengerMultiplier,
            discountMultiplier,

            totalPrice

        });

        await payment.save();


        // EVENT-DRIVEN DISCOUNT LOGIC

        // Count how many payments/bookings user has
        const userPayments = await Payment.countDocuments({
            userId
        });


        // Trigger discount unlock after 3 successful payments
        if (userPayments >= 3) {

            try {

                // Get user details from customer service
                const userResponse = await axios.get(
                    `http://localhost:5001/api/customers/${userId}`
                );

                const user = userResponse.data;


                // Only unlock once
                if (!user.discountUnlocked) {

                    // Update user discount status
                    await axios.put(
                        `http://localhost:5001/api/customers/unlock-discount/${userId}`
                    );


                    // Create notification
                    await axios.post(
                        "http://localhost:5001/api/customers/notifications",
                        {
                            userId,
                            message:
                                "Congratulations! You unlocked a 10% discount on future rides."
                        }
                    );

                    console.log("Discount unlocked notification sent");

                }

            } catch (error) {

                console.log(error.message);

            }

        }


        res.status(201).json({

            message: "Payment processed successfully",

            payment

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET PAYMENT DETAILS
router.get("/:bookingId", async (req, res) => {

    try {

        const payment = await Payment.findOne({
            bookingId: req.params.bookingId
        });

        res.json(payment);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;