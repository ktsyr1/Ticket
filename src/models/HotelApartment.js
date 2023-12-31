const mongoose = require('mongoose');

const HotelApartmentSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    image: { type: String, required: true, },
    images: { type: [String], required: true, },
    about: { type: String, required: true, },
    roomCount: String,
    rank: { type: Number },
    breakfast: Boolean,
    city: { type: String, required: true, },
    interiorFeatures: { type: String, required: true, },
    accommodationFeatures: { type: String, required: true, },
    generalDetails: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now },
});

const HotelApartment = mongoose.model('HotelApartment', HotelApartmentSchema);

module.exports = HotelApartment;
