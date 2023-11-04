const express = require('express');
const router = express.Router();
const { studentMarkList } = require('../controllers/mark_list')
const { fetchSpecificClass } = require('../controllers/mark_list');
const { validateToken } = require('../JWT');

router.post('/fetchMarkList', studentMarkList);
router.post('/fetchSpecificClass', fetchSpecificClass);

module.exports = router