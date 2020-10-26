//model模型负责和数据库打交道 获取详细数据写在模型model
const mongoose = require('mongoose');
let siteConfig = require('../config/siteConfig')
mongoose.connect('mongodb://localhost/moviedb'); //连接数据库
const movieModel = mongoose.model('Movie', { movieName: String, imgUrl: String, markup: String, downUrl: String, secret: String });//movies表模型
function newMovieModel(req,res){

// console.log(transfer.imgUrl);
    let {movieName,  markup, downUrl, secret} = req.body;
    const movie = new movieModel({movieName,imgUrl:siteConfig.imgUrl,  markup, downUrl, secret})
    siteConfig.imgUrl = "images/default.jpg"; //恢复默认
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

function getMovieList(callback){
    movieModel.find().exec((error,data)=>{ //查找movie表的所有数据
        if(error){
            callback(error);
        }
        // console.log('hhh')
        callback(null,data);

    })
}

function getMovieOne(movieId){
    console.log(movieId)
    return new Promise(function (resolve,reject) {
        if(movieId === ''){
            resolve({
                error_code: 2002,
                reason: "获取失败,电影id不能为空",
                result: {
                    data: null
                }
            })

        }else{
                movieModel.findOne({_id:movieId}).exec((error,data)=>{ //查找movie表的所有数据
                    if(error){
                        console.log(error)
                        reject({
                            error_code:2001,
                            reason: "系统错误,"+error.reason,
                            result: {
                                data: null
                            }
                        });
                    }else if(data){
                        resolve({
                            error_code: 0,
                            reason: "获取数据成功",
                            result: {
                                data:{
                                    movieId : data._id,
                                    movieName: data.movieName,
                                    imgUrl: siteConfig.siteUrl + data.imgUrl,
                                    markup: data.markup,
                                    downUrl: data.downUrl,
                                    secret: data.secret
                                }
                            }
                        });

                    }else{
                        resolve({
                            error_code: 2003,
                            reason: "获取数据失败，没有这条数据",
                            result: {
                                data:null
                            }
                        });
                    }
                })

        }

    })

}
module.exports =  {
    newMovieModel,
    movieList,
    getMovieList,
    getMovieOne
}
