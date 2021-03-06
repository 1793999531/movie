const express = require('express')
let siteConfig = require('../config/siteConfig')
const router = express.Router()
const movieController = require('../controllers/movieController')
const path = require('path');
const multer  = require('multer')



const storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹需要手动创建！！！
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        if(file){
            let filename = file.fieldname + '-' + Date.now()  + path.extname(file.originalname);
            siteConfig.imgUrl = "uploads/" + filename;
            cb(null, filename);
        }
    }
});
//添加配置文件到muler对象。
const upload = multer({
    storage: storage
});

//newMovie
router.post('/newMovie',upload.single('imgUrl'),movieController.newMovie)

//movieAdd.html
router.get('/movieAdd',function (req,res) {
    res.render("movie-add")
})

//movieList.html
router.get('/movieList',movieController.showMovieList)


module.exports = router;
