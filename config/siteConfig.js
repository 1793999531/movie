const sitePort = 9000; //网站端口
const siteUrl = `http://localhost:${sitePort}/`; //网站地址与端口
let imgUrl = "images/default.jpg"; //默认图片，没上传图片时使用默认图片
const movieDBUrl = "mongodb://localhost/moviedb" //电影数据库

module.exports = {
    siteUrl,
    imgUrl,
    movieDBUrl,
    sitePort
}