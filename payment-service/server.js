const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", paymentRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.json({
        message: "Payment Service Running"
    });
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});