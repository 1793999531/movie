const  commentModel = require('../../models/commetModel');

//添加评论
async function addComment(req,res){
    let comment =( req.body.comment || '').trim();
    let token = (req.body.token || '').trim();
    let movieId = (req.body.movieId || '').trim();
    try{
        let data = await commentModel.addComment(movieId,comment,token);
        //成功则返回数据
        res.json(data);
    }catch (e) {
        res.json(e)
    }

}

//获取评论列表
async function commentList(req,res){
    // console.log('showlist')
    let movieId = (req.query.movieId || '').trim();
    try{
        let data = await commentModel.showCommentList(movieId);
        //成功则返回数据
        res.json(data);
    }catch (e) {
        res.json(e)
    }

}
module.exports = {
    addComment,
    commentList
}