const express = require('express')
const router = express.Router()
const memberController = require('../controllers/memberController')

router.get('/list',memberController.showList)
router.get('/add',memberController.addMember)
module.exports = router ;