//model模型负责和数据库打交道 获取详细数据写在模型model
const mongoose = require('mongoose');
const siteConfig = require('../config/siteConfig')
mongoose.connect(siteConfig.movieDBUrl); //连接数据库
const menberModel = mongoose.model('Huiyuan', { username: String, password: String },'huiyuan');//movies表模型

function List(req,res){
    menberModel.find().exec((error,data)=>{ //查找huiyuan表的所有数据
        if(error){
            throw error;
        }
        // console.log(data);
        res.render("member-list",{data});
    })
}
function addMember(req,res){
    console.log("aaa")
    let {username,password} = req.body;
    let member = new menberModel({username,password});
    member.save(function (error,data) {
        if(error){
            console.log("会员添加失败");
            res.redirect('/member/add')
        }
        // res.redirect('/member/list')
        res.render("member-add",{data});

    })
}
module.exports =  {
    List,
    addMember
}
