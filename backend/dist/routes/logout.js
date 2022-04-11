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
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const User = require('../model/User');
//LOGOUT
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    console.log(req.cookies);
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(204).send('No content');
    const refreshToken = cookies.jwt;
    //is refresh token in db?
    const foundUser = yield User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        return res.sendStatus(204);
    }
    //delete refresh token in db
    foundUser.refreshToken = '';
    const result = yield foundUser.save();
    console.log(result);
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    });
    res.sendStatus(204);
}));
module.exports = router;
