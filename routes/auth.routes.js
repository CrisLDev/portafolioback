"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const passport_1 = __importDefault(require("passport"));
/*import { token } from '../middlewares/passport';*/
const router = express_1.Router();
router.route('/users')
    .post(auth_1.register);
router.route('/auth')
    .post(auth_1.login)
    .get(passport_1.default.authenticate("jwt", { session: false }), auth_1.getMe);
exports.default = router;
