const express=require('express')
const { sendProfile, updateProfile } = require('../controllers/profile')
const router=express.Router()

router.post('/getProfile', sendProfile)
router.post('/editProfile', updateProfile)

module.exports = router