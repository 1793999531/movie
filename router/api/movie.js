
const express = require('express')
const router = express.Router()
const movieControllerApi = require('../../controllers/api/movieController')
router.get('/list',movieControllerApi.getList)
router.get('/',movieControllerApi.getOne)
module.exports = router;