
const express = require('express')
const router = express.Router()
const registerControllerApi = require('../../controllers/api/registerController')
//帐号注册
router.post('/',registerControllerApi.register)
module.exports = router;