const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());


// CUSTOMER SERVICE
app.use(
    "/api/customers",
    createProxyMiddleware({
        target: "http://localhost:5001",
        changeOrigin: true,
        pathRewrite: {
            "^/api/customers": "/api/customers"
        }
    })
);


// BOOKING SERVICE
app.use(
    "/api/bookings",
    createProxyMiddleware({
        target: "http://localhost:5002",
        changeOrigin: true,
        pathRewrite: {
            "^/api/bookings": "/api/bookings"
        }
    })
);


// PAYMENT SERVICE
app.use(
    "/api/payments",
    createProxyMiddleware({
        target: "http://localhost:5003",
        changeOrigin: true,
        pathRewrite: {
            "^/api/payments": "/api/payments"
        }
    })
);


app.get("/", (req, res) => {

    res.json({
        message: "API Gateway Running"
    });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`API Gateway running on port ${PORT}`);

});