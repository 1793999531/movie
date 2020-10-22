const express = require('express')
var router = express.Router()
const path = require('path');
var multer  = require('multer')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/moviedb'); //连接数据库
const movieModel = mongoose.model('Movie', { movieName: String, imgUrl: String, markup: String, downUrl: String, secret: String });//movies表模型

let imgUrl = "images/default.jpg";
const storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹需要手动创建！！！
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        if(file){
            let filename = file.fieldname + '-' + Date.now()  + path.extname(file.originalname);
            imgUrl = "uploads/" + filename;
            cb(null, filename);
        }
        // console.log(file);
    }
});
//添加配置文件到muler对象。
const upload = multer({
    storage: storage
});

//newMovie
router.post('/newMovie',upload.single('imgUrl'),function (req,res) {
    let {movieName,  markup, downUrl, secret} = req.body;
    const movie = new movieModel({movieName, imgUrl, markup, downUrl, secret})
    movie.save(function (error,data) {//开始插入数据
        if (error){
            throw  error;
        }
        res.redirect("/admin/movieList")
    })
    // console.log(req.body.movieName)

})

//movieAdd.html
router.get('/movieAdd',function (req,res) {
    res.render("movie-add")
})

//movieList.html
router.get('/movieList',function (req,res) {

    movieModel.find().exec((error,data)=>{ //查找movie表的所有数据
        if(error){
            throw error;
        }
        console.log(data);
        res.render("movie-list",{data});
    })

})

module.exports = router;
