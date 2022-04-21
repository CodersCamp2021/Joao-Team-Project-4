"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    director: { type: String, required: false },
    genres: { type: [], required: false },
    description: { type: String, required: false },
    poster: { type: String, required: false },
    length: { type: String, required: false },
    stars: { type: [], required: false }
});
const Movie = (0, mongoose_1.model)('Movie', MovieSchema);
exports.default = Movie;
