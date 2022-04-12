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
let router = express.Router();
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validation_1 = require("../validation");
//LOGIN
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the data
    const { error } = (0, validation_1.loginValidation)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    //check if the email exist
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({ message: 'Email is not found' });
    //check if password is correct
    const validPass = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send({ message: 'Invalid password' });
    //find user roles
    const roles = Object.values(user.roles).filter(Boolean);
    //create and assign a access token
    const accessToken = jsonwebtoken_1.default.sign({
        user_details: {
            email: user.email,
            roles: roles,
        },
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    //create and assign a refresh token
    const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
    user.refreshToken = refreshToken;
    const result = yield user.save();
    console.log(result);
    console.log(roles);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
    });
    console.log(req.cookies);
    res.json({ roles, accessToken });
}));
module.exports = router;
