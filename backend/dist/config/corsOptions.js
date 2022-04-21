"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
const customOrigin = (requestOrigin, callback) => {
    if (!requestOrigin || allowedOrigins_1.default.indexOf(requestOrigin) !== -1) {
        callback(null, true);
    }
    else {
        callback(new Error('Not allowed by CORS'));
    }
};
const corsOptions = {
    origin: customOrigin,
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
