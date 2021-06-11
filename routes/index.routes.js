"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const tecnology_routes_1 = __importDefault(require("./tecnology.routes"));
const project_routes_1 = __importDefault(require("./project.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.index = {
    tecnologiesRoute: tecnology_routes_1.default,
    projectsRoute: project_routes_1.default,
    authRoute: auth_routes_1.default
};
