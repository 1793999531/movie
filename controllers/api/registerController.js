const  registerModel = require('../../models/registerModel');

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