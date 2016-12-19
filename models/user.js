var mongoose = require("mongoose");
var crypto = require("crypto");   //用于密码加盐加密
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//用户Model,所需要的添加的字段，以及关联查询的字段
var UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    createAt:{type:Date,default: Date.now},
    updateAt:{type:Date,default: Date.now},  //没有括号
    articleId:{type:ObjectId},               //和发表的文章关联信息
    phone:{type:String,required:true},
    ban:{type:Boolean,default: true}         //是否禁止登录注册
});

//用于处理登录时间和修改用户信息的时间时，重新定义注册、登录时间
UserSchema.pre("save",function(next){
    console.log("只有保存才能进入吗？");
    if(this.isNew){
        this.createAt = this.updateAt = Date.new;
    }else{
        this.updateAt = Date.new;
    }
    //对密码进行加盐加密
    this.password = crypto.createHmac("sha256",this.password).update("bu gao su ni mi ma").digest("hex");
    next();
});

module.exports = mongoose.model("User",UserSchema);

