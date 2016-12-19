var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookie = require("cookie-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var config = require("./config");
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var path = require("path");
var cors = require("cors");

var app = express();

//中间件的添加
app.use(cors());       //解决跨域问题
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookie(config.session.keys));
app.use(session({
    name:config.session.keys,
    secret:config.session.secret,
    resave:config.session.resave,
    cookie:config.session.cookie,
    store:new MongoStore({
        url:config.session.store
    })
}));

require("./routes")(app);

//解决跨域问题；这样配置也可以解决跨域问题
//app.all('*',function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//
//    if (req.method == 'OPTIONS') {
//        res.send(200);
//    }
//    else {
//        next();
//    }
//});

app.listen(config.port,function(){
    console.log("Listen : " + config.port);
});





