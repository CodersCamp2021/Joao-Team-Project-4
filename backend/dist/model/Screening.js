"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const screeningSchema = new mongoose.Schema({
    cinemaId: {
        type: mongoose.ObjectId,
        required: true
    },
    cinemaHallId: {
        type: mongoose.ObjectId,
        required: true
    },
    movieId: {
        type: mongoose.ObjectId,
        required: true
    },
    screeningDate: {
        type: Date,
        required: true,
    },
    reservedSeats: {
        type: Array,
        required: true
    }
});
module.exports = mongoose.model('Screening', screeningSchema);
