"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express = __importStar(require("express"));
const mongoose = __importStar(require("mongoose"));
const Movie_1 = __importDefault(require("../model/Movie"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("../config/corsOptions"));
const router = express.Router();
router.use((0, cors_1.default)(corsOptions_1.default));
//Display all movies
router.get('/', (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (req, res) => {
    Movie_1.default.find({}, (err, docs) => {
        if (err) {
            return res.status(500).send("server error - /movies GET");
        }
        return res.status(200).send(docs);
    });
});
//Adding new movie
router.post('/new', (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = new Movie_1.default({
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        genres: req.body.genres,
        description: req.body.description,
        poster: req.body.poster,
        length: req.body.length,
        stars: req.body.stars
    });
    try {
        const savedMovie = yield movie.save();
        return res.status(201).json({ savedMovie });
    }
    catch (e) {
        console.error("server error - /movies POST", e);
        return res.status(500).send("Error saving the movie.");
    }
}));
router.delete("/:id", (0, cors_1.default)(corsOptions_1.default), verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(400).send("Invalid params");
        return;
    }
    Movie_1.default.findOneAndDelete({ _id: _id }, function (err) {
        if (err) {
            return res.status(500).send("server error while deleting movie - /movies DELETE" + err);
        }
        else {
            return res.status(200).send("Successfully deleted");
        }
    });
}));
exports.default = router;
