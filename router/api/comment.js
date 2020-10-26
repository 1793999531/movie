
const express = require('express')
const router = express.Router()
const commentControllerApi = require('../../controllers/api/commentController')
//帐号注册
router.post('/add',commentControllerApi.addComment)
router.get('/list',commentControllerApi.commentList)
module.exports = router;