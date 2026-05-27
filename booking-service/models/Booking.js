const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    pickupLocation: {
        type: String,
        required: true
    },

    destinationLocation: {
        type: String,
        required: true
    },

    bookingDate: {
        type: String,
        required: true
    },

    bookingTime: {
        type: String,
        required: true
    },

    passengers: {
        type: Number,
        required: true
    },

    cabType: {
        type: String,
        enum: ["Economic", "Premium", "Executive"],
        required: true
    },

    status: {
        type: String,
        default: "Current"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Booking", bookingSchema);