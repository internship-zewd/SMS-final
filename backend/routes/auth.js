const express = require('express');
const router = express.Router();
const { loginController, resetPassword, forgotPassword } = require('../controllers/auth')

router.post('/login', loginController)
router.post('/resetPassword', resetPassword)
router.post('forgotPassword', forgotPassword)

module.exports = router