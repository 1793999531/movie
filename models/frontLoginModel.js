const md5 = require('md5');
const salt = require('../config/salt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/moviedb'); //连接数据库

const userModel = mongoose.model('User', { username: String, password: String },'users');//users表模型
//f:front 前台登录检查
function loginCheck(username,password) {


    return new Promise(function (resolve,reject) {

        console.log(username,password);
        if(username === '' || password === ''){
            reject({
                error_code:4004,
                reason: "登录失败,用户名或密码不能为空",
                result: {
                    data: null
                }
            });
        }

        //查user表是否已存在该用户
        userModel.findOne({username}).exec(function (error,data) {

            if(error){
                reject({
                    error_code:4001,
                    reason: "系统错误,"+error.reason,
                    result: {
                        data: null
                    }
                });
            }
            console.log(data,'---abc',!data)
            //没存在
            if(!data){
                resolve({
                    error_code: 3002,
                    reason: "登录失败，用户名不存在",
                    result: {
                        data: null
                    }
                })


            }else{//存在
                let md5pass = md5(md5(password)+salt.salt);
                console.log(md5pass,data.password,data)
                if(md5pass === data.password){
                    let token = jwt.sign({ username: username ,userId: data._id}, salt.salt,{expiresIn: 60 * 60 });//token有效时间为1小时
                    console.log(token);

                            resolve({
                                error_code: 0,
                                reason: "登录成功",
                                result: {
                                    data:{
                                        id: data._id,
                                        token,
                                        username
                                    }

                                }
                            })
                }else{
                    resolve({
                        error_code: 4002,
                        reason: "登录失败，密码错误",
                        result: {
                            data: null
                        }
                    })
                }

            }


        })
        console.log(666);
    })

}

module.exports = {
    loginCheck
}