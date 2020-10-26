
const express = require('express')
const router = express.Router()
const frontLoginControllerApi = require('../../controllers/api/frontLoginController')
//帐号注册
router.get('/',frontLoginControllerApi.frontLogin)
module.exports = router;