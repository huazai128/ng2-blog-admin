//req.query: 解析后的 url 中的 querystring，如 ?name=haha，req.query 的值为 {name: 'haha'}
//req.params: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}
//req.body: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 req.body 为 {name: 'haha'}

var db = require("../models");
var crypto = require("crypto"); //密码加密

//密码加密
function sha256(text){
    return crypto.createHmac("sha256",text).update("bu gao su ni mi ma").digest("hex")
}

//注册用户
exports.register = function(req,res){
    var user = db.User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    user.save(function(err,result){
        if(err){
            return res.json({success:false})
        }else{
            res.json({success:true});
        }
    })
};

//查询用户是否存在
exports.getUser = function(req,res){
    var name = req.query.name;
    db.User.findOne({name:name},function(err,user){
        if(err){
            return res.json({success:false});
        }
        if(user){
            res.json(200,{success:true});//用户存在
        }else{
            res.json(200,{success:false});//用户不存在
        }
    })
};

//查询email是否存在
exports.getEmail = function(req,res){
    var email = req.query.email;
    db.User.findOne({email:email},function(err,user){
        if(err){
            return res.json({success:false});
        }
        if(user){
            res.json(200,{success:true});//email存在
        }else{
            res.json(200,{success:false});//email不存在
        }
    })
};

//登录
exports.login = function(req,res){
    var name = req.body.name;
    var password = sha256(req.body.password);
    console.log(name,password);
    db.User.findOne({name:name,password:password},function(err,user){
        if(err){
            return res.json({success:false,error:err})
        }
        if(!user){
            return res.json({success:false,error:"用户或密码不对"});
        }
        if(!user.ban){  //true才能进入
            return res.json({success:false,error:"用户已禁止登录，请联系管理员!"})
        }
        user = user.toObject();
        req.session.userId = user._id;     //session缓存信息
        delete user.password;              //只是对象删除，不会删除数据库数据
        user.success = true;
        console.log(user);
        res.json(user);     //传什么信息到前台？但是不能包含密码
    })
};
//退出登录
exports.logout = function(req,res){
    req.session.destroy();
    res.json({success:true})
};

//查询所有的用户
exports.getUsers = function(req,res){
    db.User.find({},null,function(err,users){
        if(err){
            return res.status(500).json({success:false})
        }
        res.json(200,users);
    })
};
