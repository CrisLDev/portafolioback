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
exports.deleteProject = exports.editProject = exports.getProject = exports.getProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
//@Route    Post api/tecnology
//@desc     Create new tecnology
//@access   Public
exports.createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*const tecnologiesMapped:Array<String> = [];
    const tecnologiesToSave = req.body.tecnologies.map((tecnology:string)=> {
        tecnologiesMapped.push(tecnology.split("+")[0]);
    });*/
    const { es_name, en_name, es_description, en_description, imgUrls, tecnologies } = req.body;
    const urls = imgUrls.split(", ");
    try {
        const project = new Project_1.default({
            es_name, en_name, es_description, en_description, imgUrls: urls, tecnologies
        });
        const projectSaved = yield project.save();
        console.log('hola');
        return res.status(201).json({ projectSaved });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
//@Route    Get api/project
//@desc     Get all projects
//@access   Public
exports.getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.default.find().populate('tecnologies');
        return res.status(200).json(projects);
    }
    catch (error) {
        return res.status(400).json({ error: "Server error" });
    }
});
//@Route    Get api/project/:id
//@Param    Id
//@desc     Get project by id
//@access   Public
exports.getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectById = yield Project_1.default.findById(req.params.id);
        return res.status(200).json({ projectById });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
//@Route    Put api/project/:id
//@Param    Id
//@desc     Update project by id
//@access   Private
exports.editProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { es_name, en_name, es_description, en_description, tecnologies, imgUrls, } = req.body;
    try {
        const projectDataToUpdate = ({
            es_name,
            en_name,
            es_description,
            en_description,
            tecnologies,
            imgUrls,
        });
        const projectUpdated = yield Project_1.default.findByIdAndUpdate(req.params.id, projectDataToUpdate, { new: true });
        return res.status(201).json({ projectUpdated });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
//@Route    Delete api/project/:id
//@Param    Id
//@desc     Delete project by id
//@access   Private
exports.deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectDeleted = yield Project_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).json({ projectDeleted });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
