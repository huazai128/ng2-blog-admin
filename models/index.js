var mongoose = require("mongoose");
var config = require("../config");
mongoose.connect(config.db);

exports.User = require("./user");