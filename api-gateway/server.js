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
        target: "https://distributedprogramming-assignment.onrender.com",
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
        target: "https://booking-service-zxa0.onrender.com",
        changeOrigin: true
    })
);


// PAYMENT SERVICE
app.use(
    "/api/payments",
    createProxyMiddleware({
        target: "https://payment-service-ede8.onrender.com",
        changeOrigin: true
    })
);


// FARE SERVICE
app.use(
    "/api/fare",
    createProxyMiddleware({
        target: "https://fare-service-pd0j.onrender.com",
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
        target: "https://location-service-zcol.onrender.com",
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