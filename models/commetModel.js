const salt = require('../config/salt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');
mongoose.connect('mongodb://localhost/moviedb'); //连接数据库

const commentModel = mongoose.model('Comment', {userId: String ,movieId: String , username: String, comment: String, time: String },'comments');//user表模型
function addComment(movieId,comment,token) {
    console.log(comment,token)
    let decode
    try {
        decode = jwt.verify(token,salt.salt);
        // console.log(decode)
    }catch (e) {
        reject({
            error_code: 0,
            reason: "无效的token",
            result: {
                data:null

            }
        })
    }
    console.log(decode)
    return new Promise(function (resolve,reject) {

        if(comment === '' ){
            reject({
                error_code:5004,
                reason: "评论失败,评论内容不能为空",
                result: {
                    data: null
                }
            });
        }
        if(movieId === '' || token === ''){
            reject({
                error_code:5005,
                reason: "评论失败,参数错误",
                result: {
                    data: null
                }
            });
        }
        let time = moment().format('YYYY-MM-DD HH:mm:ss');//评价时间
                //评论数据入库
                let commentM = new commentModel({userId:decode.userId ,movieId, username: decode.username, comment, time});

                commentM.save(function (error,data) {
                    if(error){
                        reject({
                            error_code:5003,
                            reason: "系统错误,"+error.reason,
                            result: {
                                data: null
                            }
                        });
                    }else{
                        resolve({
                            error_code: 0,
                            reason: "评论成功",
                            result: {
                                data:{
                                    comment,
                                    time,
                                    username:decode.username
                                }

                            }
                        })
                    }
                    console.log(data);
                })








    })


}

function showCommentList(movieId){
    return new Promise(function (resolve,reject) {
        if(movieId === ''){
            reject({
                error_code:5005,
                reason: "获取评论列表失败,movieId不能为空",
                result: {
                    data: null
                }
            })
        }
        //{ObjectId:movieId}
        commentModel.find().exec((error,data)=>{ //查找comments表的所有数据
            if(error){
                reject({
                    error_code:5006,
                    reason: "系统错误,"+error,
                    result: {
                        data: null
                    }
                })
            }

            if(data.length!=0){
                resolve({
                    error_code:5007,
                    reason: "获取评论列表成功",
                    result: {
                        data
                    }
                })
            }else{
                resolve({
                    error_code:5008,
                    reason: "该电影暂无评论",
                    result: {
                        data: null
                    }
                })
            }

        })
    })

}
module.exports = {
    addComment,
    showCommentList
}