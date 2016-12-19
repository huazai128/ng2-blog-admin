//用于验证用户是否登录
module.exports = {
    checkLogin :function(req,res,next){ //用于其他页面进入权限页面时，进行判断
        if(!req.session.userId){
            return res.json({success:false});  //请求失败
        }
        next();
    },
    checkNotLogin:function(req,res,next){  //用于登录注册，等页面的请求判断
        if(req.session.userId){
            return res.json({success:true})
        }
        next();
    }
};