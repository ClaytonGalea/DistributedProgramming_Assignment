const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());


// ESTIMATE FARE
app.get("/estimate-fare", (req, res) => {

    try {

        const { pickup, destination } = req.query;

        // RANDOM FARE BETWEEN 10-30
        const estimatedFare =
            Math.floor(Math.random() * 21) + 10;

        res.json({

            pickup,
            destination,

            estimatedFare

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


app.get("/", (req, res) => {

    res.json({
        message: "Fare Service Running"
    });

});


const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {

    console.log(`Fare Service running on port ${PORT}`);

});