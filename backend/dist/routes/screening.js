"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const Screening_1 = __importDefault(require("../model/Screening"));
const Movie_1 = __importDefault(require("../model/Movie"));
const Cinema_1 = __importDefault(require("../model/Cinema"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const verifyRoles_1 = __importDefault(require("../middleware/verifyRoles"));
const roles_list_1 = __importDefault(require("../config/roles_list"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("../config/corsOptions"));
const route = (0, express_1.Router)();
const startOfDay = (date) => {
    return (new Date(date.getTime() - date.getTime() % (3600 * 1000 * 24)));
};
const endOfDay = (date) => {
    return (new Date(date.getTime() - date.getTime() % (3600 * 1000 * 24) + 86399999));
};
const stringToTimeTouple = (string) => {
    return string.slice(0, -1).split("h").map(e => (parseInt(e)));
};
const checkOverlapping = (a_start, a_end, b_start, b_end) => {
    if (a_start <= b_start && b_start <= a_end)
        return true;
    if (a_start <= b_end && b_end <= a_end)
        return true;
    if (b_start <= a_start && a_end <= b_end)
        return true;
    return false;
};
route.use((0, cors_1.default)(corsOptions_1.default));
route.post('/screening', (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (0, verifyRoles_1.default)(roles_list_1.default.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const screening = yield new Screening_1.default({
        cinemaId: req.body.cinemaId,
        cinemaHallId: req.body.cinemaHallId,
        movieId: req.body.movieId,
        screeningDate: req.body.screeningDate,
        reservedSeats: []
    });
    if (!mongoose_1.Types.ObjectId.isValid(req.body.cinemaId)) {
        return res.status(400).send("Invalid cinema id");
    }
    if (!mongoose_1.Types.ObjectId.isValid(req.body.cinemaHallId)) {
        return res.status(400).send("Invalid cinema hall id");
    }
    if (!mongoose_1.Types.ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send("Invalid movie id");
    }
    // Logic
    const movie = yield Movie_1.default.findById(new mongoose_1.Types.ObjectId(req.body.movieId));
    if (!movie) {
        return res.status(400).send("Movie not found");
    }
    const [screeningHours, screeningMinutes] = stringToTimeTouple(movie.length);
    const screeningStart = yield new Date(req.body.screeningDate);
    const screeningEnd = yield new Date(screeningStart.getTime() + screeningHours * 1000 * 60 * 60 + screeningMinutes * 1000 * 60);
    const cinema = yield Cinema_1.default.findById(new mongoose_1.Types.ObjectId(req.body.cinemaId));
    if (!cinema) {
        return res.status(400).send("Cinema not found");
    }
    // Check if screening starts within cinema opening hours + boundaries
    if (screeningStart.getDay() == 1) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000);
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000);
        if (cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start");
        }
        if (screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end");
        }
    }
    if (screeningStart.getDay() == 2) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000);
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000);
        if (cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start");
        }
        if (screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end");
        }
    }
    if (screeningStart.getDay() == 3) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000);
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000);
        if (cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start");
        }
        if (screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end");
        }
    }
    if (screeningStart.getDay() == 4) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000);
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000);
        if (cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start");
        }
        if (screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end");
        }
    }
    if (screeningStart.getDay() == 5) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000);
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000);
        if (cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start");
        }
        if (screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end");
        }
    }
    if (screeningStart.getDay() == 6) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000);
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000);
        if (cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start");
        }
        if (screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end");
        }
    }
    if (screeningStart.getDay() == 0) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000);
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000);
        if (cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start");
        }
        if (screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end");
        }
    }
    // Checking integration with other screenings
    const screenings = yield Screening_1.default.find({
        cinemaHallId: new mongoose_1.Types.ObjectId(req.body.cinemaHallId),
        screeningDate: {
            $gte: startOfDay(screeningStart),
            $lte: endOfDay(screeningStart)
        }
    });
    for (const _screening of screenings) {
        const _movie = yield Movie_1.default.findById(new mongoose_1.Types.ObjectId(_screening.movieId));
        if (!_movie) {
            return res.status(400).send("Movie not found");
        }
        const [_screeningHours, _screeningMinutes] = stringToTimeTouple(_movie.length);
        const _screeningStart = new Date(_screening.screeningDate);
        const _screeningEnd = new Date(_screeningStart.getTime() + _screeningHours * 1000 * 60 * 60 + _screeningMinutes * 1000 * 60);
        // Check if there's break after screening
        const endDiff = screeningStart.getTime() - _screeningEnd.getTime();
        console.log(_movie.length);
        if (endDiff > 0 && endDiff < 900000) {
            return res.status(400).send("Bad request - there has to be a 15 minute break before next screening");
        }
        //Check if screenings overlap
        if (checkOverlapping(screeningStart, screeningEnd, _screeningStart, _screeningEnd)) {
            return res.status(400).send("Bad request - screening overlaps with another screening");
        }
    }
    try {
        const savedScreening = yield screening.save();
        return res.status(201).json({ savedScreening });
    }
    catch (e) {
        console.error('server error - /screening POST');
        return res.status(500).send('Error while saving cinema hall.');
    }
}));
route.delete('/screening/:screeningId', (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (0, verifyRoles_1.default)(roles_list_1.default.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Screening_1.default.findByIdAndDelete(new mongoose_1.Types.ObjectId(req.params.screeningId), (err, docs) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .send('server error while deleting screening - /screening DELETE');
        }
        return res.status(200).send(docs);
    });
}));
route.get('/screenings/hall/:cinemaHallId/:screeningDate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const day = new Date(req.params.screeningDate);
    Screening_1.default.find({
        cinemaHallId: new mongoose_1.Types.ObjectId(req.params.cinemaHallId),
        screeningDate: {
            $gte: startOfDay(day),
            $lte: endOfDay(day)
        }
    }, null, { sort: { screeningDate: 1 } }, (err, docs) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .send('server error while fetching screenings - /screenings/hall GET');
        }
        return res.status(200).send(docs);
    });
}));
route.get('/screenings/movie/:movieId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Screening_1.default.find({
        movieId: new mongoose_1.Types.ObjectId(req.params.movieId),
    }, (err, docs) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .send('server error while fetching screenings - /screenings/movie GET');
        }
        return res.status(200).send(docs);
    });
}));
exports.default = route;
