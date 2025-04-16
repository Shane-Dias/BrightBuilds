// studyRoutes.js
const express = require('express');
const router = express.Router();
const { studyAssistantController } = require('../controllers/studyAssistantController');

router.post('/api/studyAssistant', studyAssistantController);

module.exports = router;