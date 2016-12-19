var controller = require("../controllers");
var passport = require("../passport");

exports = module.exports = function(app){
    //用户注册
    app.post("/register",passport.checkNotLogin,controller.User.register);
    //获取所有的用户
    app.get("/users",passport.checkNotLogin,controller.User.getUsers);
    //验证用户名是否存在
    app.get("/name",passport.checkNotLogin,controller.User.getUser);
    //验证email是否存在
    app.get("/email",passport.checkNotLogin,controller.User.getEmail);
    //post登录
    app.post("/login",passport.checkNotLogin,controller.User.login);
};