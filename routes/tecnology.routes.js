"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tecnology_1 = require("../controllers/tecnology");
const router = express_1.Router();
router.route('/tecnology')
    .post(tecnology_1.createTecnology)
    .get(tecnology_1.getTecnologies);
router.route('/tecnology/:id')
    .get(tecnology_1.getTecnology)
    .put(tecnology_1.editTecnology)
    .delete(tecnology_1.deleteTecnology);
exports.default = router;
