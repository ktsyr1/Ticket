const mongoose = require('mongoose');

const carWithDriverSchema = new mongoose.Schema({
    title: String,
    city: String,
    carImage: String,
    duration: String,
    driver: String,
    tourDuration: String,
    price: Number,
    additionalFeatures: [String],
    programDetails: String,
    createdAt: { type: Date, default: Date.now },
});

const CarWithDriver = mongoose.model('CarWithDriver', carWithDriverSchema);

module.exports = CarWithDriver;
