const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.json({
        message: "Booking Service Running"
    });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});