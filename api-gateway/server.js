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
        changeOrigin: true
    })
);


// PAYMENT SERVICE
app.use(
    "/api/payments",
    createProxyMiddleware({
        target: "http://localhost:5003",
        changeOrigin: true
    })
);


// FARE SERVICE
app.use(
    "/api/fare",
    createProxyMiddleware({
        target: "http://localhost:5004",
        changeOrigin: true,
        pathRewrite: {
            "^/api/fare": ""
        }
    })
);


// LOCATION SERVICE
app.use(
    "/api/locations",
    createProxyMiddleware({
        target: "http://localhost:5005",
        changeOrigin: true
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