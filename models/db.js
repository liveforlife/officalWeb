var mongoose = require("mongoose"); //引入mongoose

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});

mongoose.Promise = global.Promise;  //为了解决过期的问题

mongoose.connect('mongodb://localhost/officalWeb'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017  
module.exports = mongoose;