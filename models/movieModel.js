//model模型负责和数据库打交道 获取详细数据写在模型model
const mongoose = require('mongoose');
let transfer = require('../transfer/transfer');
mongoose.connect('mongodb://localhost/moviedb'); //连接数据库
const movieModel = mongoose.model('Movie', { movieName: String, imgUrl: String, markup: String, downUrl: String, secret: String });//movies表模型
function newMovieModel(req,res){


// console.log(transfer.imgUrl);
    let {movieName,  markup, downUrl, secret} = req.body;
    const movie = new movieModel({movieName,imgUrl:transfer.imgUrl,  markup, downUrl, secret})
    movie.save(function (error,data) {//开始插入数据
        if (error){
            throw  error;
        }
        res.redirect("/admin/movieList")
    })
}
function movieList(req,res){
    movieModel.find().exec((error,data)=>{ //查找movie表的所有数据
        if(error){
            throw error;
        }
        // console.log(data);
        res.render("movie-list",{data});
    })
}
module.exports =  {
    newMovieModel,movieList
}
