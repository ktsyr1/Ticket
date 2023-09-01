// models/Hotel.js
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: String,
    rank: Number,
    city: String,
    address: String,
    image: String,
    images: [String],
    description: String,
    services: {
        freeParking: Boolean,
        freeWiFi: Boolean,
        breakfast: Boolean,
    },
    surroundingArea: String,
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
