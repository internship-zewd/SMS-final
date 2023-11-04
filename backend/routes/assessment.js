const express = require('express')
const router = express.Router();
const { fetchSpecificClass } = require('../controllers/assessment')
const { fetchSpecificStudent } = require('../controllers/assessment')
const { insertGrade } = require('../controllers/assessment');
const { validateToken } = require('../JWT');
router.post('/specificClass', fetchSpecificClass)
router.post('/specificStudent', fetchSpecificStudent)
router.post('/insertGrade' ,insertGrade)
;
module.exports = router