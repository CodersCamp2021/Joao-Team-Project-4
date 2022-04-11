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
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');
//REGISTER
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the data
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //check if the user is already in the db
    const emailExist = yield User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send({ message: 'Email already exist' });
    //hash password
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(req.body.password, salt);
    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = yield user.save();
        if (savedUser)
            res.json({ message: 'Thanks for registering' });
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
module.exports = router;
