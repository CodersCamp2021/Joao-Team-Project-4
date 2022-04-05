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
const router = require('express').Router();
const Movie = require('../model/Movie');
const cors = require("cors");
const currentYear = new Date().getFullYear(); // returns the current year
router.get('/upcoming', cors(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { year: { $gte: currentYear } };
    const allUpcoming = yield Movie.find(filter);
    res.send(allUpcoming);
}));
module.exports = router;
