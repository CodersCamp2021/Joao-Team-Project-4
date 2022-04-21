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
const Cinema_1 = __importDefault(require("../model/Cinema"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const verifyRoles_1 = __importDefault(require("../middleware/verifyRoles"));
const roles_list_1 = __importDefault(require("../config/roles_list"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("../config/corsOptions"));
const route = (0, express_1.Router)();
route.use((0, cors_1.default)(corsOptions_1.default));
route.post('/cinema', (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (0, verifyRoles_1.default)(roles_list_1.default.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cinema = new Cinema_1.default({
        country: req.body.country,
        city: req.body.city,
        adress: req.body.adress,
        openingHours: {
            monday: {
                start: req.body.openingHours.monday.start,
                end: req.body.openingHours.monday.end,
            },
            tuesday: {
                start: req.body.openingHours.tuesday.start,
                end: req.body.openingHours.tuesday.end,
            },
            wednesday: {
                start: req.body.openingHours.wednesday.start,
                end: req.body.openingHours.wednesday.end,
            },
            thursday: {
                start: req.body.openingHours.thursday.start,
                end: req.body.openingHours.thursday.end,
            },
            friday: {
                start: req.body.openingHours.friday.start,
                end: req.body.openingHours.friday.end,
            },
            saturday: {
                start: req.body.openingHours.saturday.start,
                end: req.body.openingHours.saturday.end,
            },
            sunday: {
                start: req.body.openingHours.sunday.start,
                end: req.body.openingHours.sunday.end,
            },
        },
    });
    try {
        const savedCinema = yield cinema.save();
        return res.status(201).json({ savedCinema });
    }
    catch (e) {
        console.error('server error - /cinema POST', e);
        return res.status(500).send('Error saving the cinema.');
    }
}));
route.get('/cinemas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Cinema_1.default.find({}, (err, docs) => {
        if (err) {
            return res.status(500).send('server error - /cinemas GET');
        }
        return res.status(200).send(docs);
    });
}));
route.put('/cinema', (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (0, verifyRoles_1.default)(roles_list_1.default.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Cinema_1.default.findByIdAndUpdate(req.body.id, Object.assign({}, req.body.newCinema), { new: true }, (err, docs) => {
        if (err) {
            return res
                .status(400)
                .send('server error while updating cinema - /cinema PUT');
        }
        return res.status(200).send(docs);
    });
}));
route.delete('/cinema/:id', (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (0, verifyRoles_1.default)(roles_list_1.default.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Cinema_1.default.findByIdAndDelete(new mongoose_1.Types.ObjectId(req.params.id), (err, docs) => {
        if (err) {
            console.error(err);
            return res
                .status(400)
                .send('server error while deleting cinema - /cinema DELETE');
        }
        return res.status(200).send(docs);
    });
}));
exports.default = route;
