const  registerModel = require('../../models/registerModel');


/**
 * @api {post} /register 用户注册接口
 * @apiName register
 * @apiGroup 用户管理
 * @apiVersion 0.1.0
 * @apiDescription 完成用户注册操作
 *
 * @apiPermission anyone
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiParam {string} infos 简介
 *
 * @apiSuccess (success-3000) {String} code 响应状态码
 * @apiSuccess (success-3000) {String} msg 响应描述
 * @apiSuccess (success-3000) {Object} data 成功时返回数据
 *
 * @apiSuccessExample {json} 成功注册-示例：
 * {
 *  "error_code": 0,
 *  "reason": "创建成功",
 *  "result": {
 *      "data": {
 *          "id": "5f96b4d8c75bcd50e4313a15",
 *          "username": "www"
 *      }
 *  }
 *  }
 *
 */
//帐号注册控制
async function register(req,res){
    let username =( req.body.username || '').trim();
    let password = (req.body.password || '').trim();
    let infos = (req.body.infos || '').trim();
    // console.log(movieId)
    try{
        let data = await registerModel.register(username,password,infos);
        //成功则返回数据
        res.json(data);
    }catch (e) {
        res.json(e)
    }

}
module.exports = {
    register
}