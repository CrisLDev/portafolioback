"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const projectSchema = new mongoose_1.Schema({
    es_name: {
        type: String,
        required: true,
        trim: true
    },
    en_name: {
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
    tecnologies: [
        {
            type: ObjectId,
            ref: 'Tecnology'
        }
    ],
    imgUrls: {
        type: Array,
        required: true
    }
}, { timestamps: true, versionKey: false });
exports.default = mongoose_1.model('Project', projectSchema);
