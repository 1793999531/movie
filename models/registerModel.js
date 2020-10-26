const md5 = require('md5');
const salt = require('../config/salt');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/moviedb'); //连接数据库

const userModel = mongoose.model('registerUser', { username: String, password: String , infos: String},'users');//user表模型
function register(username,password,infos) {

    return new Promise(function (resolve,reject) {

        if(username === '' || password === ''){
            reject({
                error_code:3004,
                reason: "注册失败,用户名或密码不能为空",
                result: {
                    data: null
                }
            });
        }
        console.log(username,222)
        //查user表是否已存在该用户
        userModel.findOne({username}).exec(function (error,data) {
            if(error){
                reject({
                    error_code:3001,
                    reason: "系统错误,"+error.reason,
                    result: {
                        data: null
                    }
                });
            }
            console.log(data,'---abc',!data)
            //没存在，返回创建成功数据
            if(!data){
                console.log('ruku')
                //入库
                let md5pass = md5(md5(password)+salt.salt);//加盐进行双重加密，防止暴力破解
                let user = new userModel({username,password:md5pass,infos});

                user.save(function (error,data) {
                    if(error){
                        reject({
                            error_code:3003,
                            reason: "系统错误,"+error.reason,
                            result: {
                                data: null
                            }
                        });
                    }else{
                        resolve({
                            error_code: 0,
                            reason: "创建成功",
                            result: {
                                data:{
                                    id: data._id,
                                    username
                                }

                            }
                        })
                    }
                    console.log(data);
                })


            }else{
                //存在，返回提示数据
                console.log("buruku");
                resolve({
                    error_code: 3002,
                    reason: "创建失败，用户名已被注册",
                    result: {
                        data: null
                    }
                })
            }


        })


    })


}

module.exports = {
    register
}