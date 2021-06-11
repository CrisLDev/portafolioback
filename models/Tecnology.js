"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tecnologySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    es_resume: {
        type: String,
        required: true,
        trim: true
    },
    en_resume: {
        type: String,
        required: true,
        trim: true
    },
    es_description: {
        type: String,
        required: true,
        trim: true
    },
    en_description: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    urlImage: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false });
exports.default = mongoose_1.model('Tecnology', tecnologySchema);
