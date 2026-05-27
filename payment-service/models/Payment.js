const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    bookingId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    cabFare: {
        type: Number,
        required: true
    },

    cabMultiplier: {
        type: Number,
        required: true
    },

    daytimeMultiplier: {
        type: Number,
        required: true
    },

    passengerMultiplier: {
        type: Number,
        required: true
    },

    discountMultiplier: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Payment", paymentSchema);