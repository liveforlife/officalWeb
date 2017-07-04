var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var userSchema=new Schema({
	name:{type:String},
	password:{type:String},
});

var userBlog=mongoose.model("login",userSchema);

module.exports=userBlog;