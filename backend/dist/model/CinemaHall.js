"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CinemaHallSchema = new mongoose_1.Schema({
    cinemaId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    rows: {
        type: Number,
        required: true,
        min: [1, "At least 1 row required"],
        max: [200, "Too many rows!"],
        validate: {
            validator: Number.isInteger,
            message: 'Row count is not an integer value'
        }
    },
    cols: {
        type: Number,
        required: true,
        min: [1, "At least 1 column required"],
        max: [200, "Too many columns!"],
        validate: {
            validator: Number.isInteger,
            message: 'Column count is not an integer value'
        }
    },
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    }
});
const CinemaHall = (0, mongoose_1.model)('CinemaHall', CinemaHallSchema);
exports.default = CinemaHall;
