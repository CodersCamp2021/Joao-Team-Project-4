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
const User = require('../model/User');
const jwt = require('jsonwebtoken');
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    console.log(cookies);
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = yield User.findOne({ refreshToken }).exec();
    if (!foundUser)
        return res.status(403).send('No user in DB'); //Forbidden
    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
        if (err)
            return res.sendStatus(403);
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign({
            user_details: {
                email: foundUser.email,
                roles: roles,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        res.json({ accessToken });
    });
}));
module.exports = router;
