
//控制器引入模型model
const movieModel = require('../models/movieModel')
function newMovie(req,res) {
//movieModel负责处理数据
    movieModel.newMovieModel(req,res);
}

function showMovieList(req,res) {
   movieModel.movieList(req,res);

}


module.exports = {
    newMovie,
    showMovieList
}