const express = require("express");
const router = express.Router();

const Location = require("../models/Location");

const axios = require("axios");

// ADD LOCATION
router.post("/add", async (req, res) => {

    try {

        const location = new Location(req.body);

        await location.save();

        res.status(201).json({
            message: "Location added successfully",
            location
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET USER LOCATIONS
router.get("/:userId", async (req, res) => {

    try {

        const locations = await Location.find({
            userId: req.params.userId
        });

        res.json(locations);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// UPDATE LOCATION
router.put("/:locationId", async (req, res) => {

    try {

        const updatedLocation = await Location.findByIdAndUpdate(

            req.params.locationId,

            req.body,

            {
                new: true
            }

        );

        res.json(updatedLocation);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// DELETE LOCATION
router.delete("/:locationId", async (req, res) => {

    try {

        await Location.findByIdAndDelete(req.params.locationId);

        res.json({
            message: "Location deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

// GET WEATHER FORECAST
router.get("/weather/:city", async (req, res) => {

    try {

        const city = req.params.city;

        const response = await axios.get(

            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`

        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;