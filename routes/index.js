var controller = require("../controllers");
var passport = require("../passport");

exports = module.exports = function(app){
    //�û�ע��
    app.post("/register",passport.checkNotLogin,controller.User.register);
    //��ȡ���е��û�
    app.get("/users",passport.checkNotLogin,controller.User.getUsers);
    //��֤�û����Ƿ����
    app.get("/name",passport.checkNotLogin,controller.User.getUser);
    //��֤email�Ƿ����
    app.get("/email",passport.checkNotLogin,controller.User.getEmail);
    //post��¼
    app.post("/login",passport.checkNotLogin,controller.User.login);
};