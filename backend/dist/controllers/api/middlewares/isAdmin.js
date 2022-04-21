"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../model/User"));
module.exports = function (req, res, next) {
    User_1.default.findById(req.user._id, (err, user) => {
        if (err) {
            return res.status(500).send("Server error.");
        }
        if (user.name != "administrator") {
            return res.status(401).send("Unauthorized.");
        }
        else {
            next();
        }
    });
};
