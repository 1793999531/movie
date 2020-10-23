
//控制器引入模型model
const memberModel = require('../models/memberModel')

function showList(req,res) {
    memberModel.List(req,res);

}
function addMember(req,res){
    memberModel.addMember(req,res);
}
module.exports = {
    showList,
    addMember
}