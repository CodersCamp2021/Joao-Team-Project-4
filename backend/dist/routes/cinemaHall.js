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
const route = require('express').Router();
const CinemaHall = require('../model/CinemaHall');
const verifyToken = require('../middleware/verifyToken');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const isNumberOk = (number) => {
    if (number < 1)
        return false;
    if (number > 200)
        return false;
    if (!Number.isInteger(number))
        return false;
    return true;
};
route.use(cors(corsOptions));
route.post('/cinema-hall', verifyToken, verifyRoles(ROLES_LIST.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isNumberOk(req.body.cols))
        return res.status(400).send("Bad request - /cinema-hall POST - cols");
    if (!isNumberOk(req.body.rows))
        return res.status(400).send("Bad request - /cinema-hall POST - rows");
    const cinemaHall = new CinemaHall({
        rows: req.body.rows,
        cols: req.body.cols,
        name: req.body.name,
        cinemaId: req.body.cinemaId
    });
    try {
        const savedCinemaHall = yield cinemaHall.save();
        return res.status(201).json({ savedCinemaHall });
    }
    catch (e) {
        console.error('server error - /cinema-hall POST');
        return res.status(500).send / ('Error while saving cinema hall.');
    }
}));
route.get('/cinema-halls/:cinemaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _cinemaId = req.params.cinemaId;
    if (!mongoose.Types.ObjectId.isValid(_cinemaId)) {
        return res.status(400).send("Invalid cinema id");
    }
    CinemaHall.find({
        cinemaId: _cinemaId
    }, (err, docs) => {
        if (err) {
            return res.status(500).send("server error - /cinema-hall GET");
        }
        return res.status(200).send(docs);
    });
}));
route.get('/cinema-hall/:cinemaHallId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _cinemaHallId = req.params.cinemaHallId;
    if (!mongoose.Types.ObjectId.isValid(_cinemaHallId)) {
        return res.status(400).send("Invalid cinema id");
    }
    CinemaHall.findById({
        _id: _cinemaHallId
    }, (err, docs) => {
        if (err) {
            return res.status(500).send("server error - /cinema-hall GET");
        }
        return res.status(200).send(docs);
    });
}));
route.put('/cinema-hall', verifyToken, verifyRoles(ROLES_LIST.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isNumberOk(req.body.newCinemaHall.cols))
        return res.status(400).send("Bad request - /cinema-hall PUT - cols");
    if (!isNumberOk(req.body.newCinemaHall.rows))
        return res.status(400).send("Bad request - /cinema-hall PUT - rows");
    yield CinemaHall.findByIdAndUpdate(req.body.id, Object.assign({}, req.body.newCinemaHall), { new: true }, (err, docs) => {
        if (err) {
            return res.status(500)
                .send('server error - /cinema-hall PUT');
        }
        return res.status(200).send(docs);
    });
}));
route.delete('/cinema-hall/:cinemaHallId', verifyToken, verifyRoles(ROLES_LIST.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    CinemaHall.findByIdAndDelete(mongoose.Types.ObjectId(req.params.cinemaHallId), (err, docs) => {
        if (err) {
            return res
                .status(500)
                .send('server error - /cinema-hall DELETE');
        }
        return res.status(200).send(docs);
    });
}));
module.exports = route;
