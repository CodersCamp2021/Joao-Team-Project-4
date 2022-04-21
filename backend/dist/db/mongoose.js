"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const database = process.env.DATABASE_NAME;
const url = process.env.MONGO_URL;
const uri = `mongodb+srv://${username}:${password}@${url}/${database}?retryWrites=true`;
try {
    mongoose_1.default
        .connect(uri)
        .then(() => {
        console.log('DB connected');
    });
}
catch (error) {
    console.log('Could not connect db');
}
var db = mongoose_1.default.connection;
