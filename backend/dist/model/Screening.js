"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScreeningSchema = new mongoose_1.Schema({
    cinemaId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    cinemaHallId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    movieId: {
        type: mongoose_1.Types.ObjectId,
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
const Screening = (0, mongoose_1.model)('Screening', ScreeningSchema);
exports.default = Screening;
