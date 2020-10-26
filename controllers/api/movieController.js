const  movieModel = require('../../models/movieModel');
const siteConfig = require('../../config/siteConfig')
function  getList(req,res) {
    movieModel.getMovieList((error,data)=>{
        if(error){
            let returnData = {
                error_code:1,
                reason: "获取数据失败",
                result: {
                    data: null
                }
            }
            res.json(returnData)
        }else{
            let arr = [];
            let temp;
            console.log(data)
            data.forEach((value,index)=>{
                temp = {
                    movieId : value._id,
                    movieName: value.movieName,
                    imgUrl: siteConfig.siteUrl + value.imgUrl,
                    markup: value.markup,
                    downUrl: value.downUrl,
                    secret: value.secret
                }
                arr.push(temp);
            })
            //获取成功
            let returnData = {
                error_code:0,
                reason: "获取数据成功",
                result: {
                    data: arr
                }
            }
            res.json(returnData);
        }
    });
}
//获取一条电影数据
async function getOne(req,res){
    let movieId = req.query.movieId || '';
    // console.log(movieId)
    try{
        let data = await movieModel.getMovieOne(movieId);
        //成功则返回数据
        res.json(data);
    }catch (e) {
        res.json(e)
    }

}
module.exports = {
    getList,
    getOne
}