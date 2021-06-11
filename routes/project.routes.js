"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../controllers/project");
const router = express_1.Router();
router.route('/project')
    .post(project_1.createProject)
    .get(project_1.getProjects);
router.route('/project/:id')
    .get(project_1.getProject)
    .put(project_1.editProject)
    .delete(project_1.deleteProject);
exports.default = router;
