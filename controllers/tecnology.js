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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTecnology = exports.editTecnology = exports.getTecnology = exports.getTecnologies = exports.createTecnology = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const Tecnology_1 = __importDefault(require("../models/Tecnology"));
//@Route    Post api/tecnology
//@desc     Create new tecnology
//@access   Public
exports.createTecnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, es_resume, es_description, en_resume, en_description, url, urlImage } = req.body;
    try {
        const tecnology = new Tecnology_1.default({
            name,
            es_resume,
            es_description,
            en_resume,
            en_description,
            url,
            urlImage
        });
        const tecnologySaved = yield tecnology.save();
        return res.status(201).json({ tecnologySaved });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
//@Route    Get api/tecnology
//@desc     Get all tecnologies
//@access   Public
exports.getTecnologies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tecnologies = yield Tecnology_1.default.find();
        return res.status(200).json(tecnologies);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
//@Route    Get api/tecnology/:id
//@Param    Id
//@desc     Get tecnology by id
//@access   Public
exports.getTecnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tecnologyById = yield Tecnology_1.default.findById(req.params.id);
        return res.status(200).json({ tecnologyById });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
//@Route    Put api/tecnology/:id
//@Param    Id
//@desc     Update tecnology by id
//@access   Private
exports.editTecnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, es_resume, es_description, en_resume, en_description, url, urlImage } = req.body;
    try {
        const tecnologyDataToUpdate = ({
            name,
            es_resume,
            es_description,
            en_resume,
            en_description,
            url,
            urlImage
        });
        const tecnologyUpdated = yield Tecnology_1.default.findByIdAndUpdate(req.params.id, tecnologyDataToUpdate, { new: true });
        return res.status(201).json({ tecnologyUpdated });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
//@Route    Delete api/tecnology/:id
//@Param    Id
//@desc     Delete tecnology by id
//@access   Private
exports.deleteTecnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tecnologyDeleted = yield Tecnology_1.default.findByIdAndDelete(req.params.id);
        const projectDeleted = yield Project_1.default.deleteMany({ 'tecnologies': { $elemMatch: { $in: req.params.id } } });
        return res.status(200).json({ tecnologyDeleted });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
