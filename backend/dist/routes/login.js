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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../validation');
//LOGIN
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the data
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //check if the email exist
    const user = yield User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({ message: 'Email is not found' });
    //check if password is correct
    const validPass = yield bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send({ message: 'Invalid password' });
    //find user roles
    const roles = Object.values(user.roles).filter(Boolean);
    //create and assign a access token
    const accessToken = jwt.sign({
        user_details: {
            email: user.email,
            roles: roles,
        },
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    //create and assign a refresh token
    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
    user.refreshToken = refreshToken;
    const result = yield user.save();
    console.log(result);
    console.log(roles);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
    });
    console.log(req.cookies);
    res.json({ roles, accessToken });
}));
module.exports = router;
