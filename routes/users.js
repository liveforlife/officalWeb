var express = require('express');

var app=new express();
var router = express.Router();
var dbLogin=require('../models/login.js');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

/* GET users listing. */
router.get('/login', function(req, res, next) {
	  res.render('stage/login',{tips:''});
	});
router.post('/login', function(req, res) {
	 console.log(req.body.name);
	 dbLogin.findOne({name:req.body.name},function(err,doc){
		 console.log(err+','+doc);
		 console.log(doc.password);
		 if(doc){
			 if(doc.password===req.body.password){
				 console.log('33');
				 res.cookie('name',req.body.name,{maxAge:3,httpOnly:true});
				 return res.redirect('./login');
			 }else{
				 res.render('stage/login',{tips:'密码不正确，请重新输入；'});
			 }
			 
		 }else{
			 res.render('stage/login',{tips:'用户名错误，请重新输入。'});
			 console.log(doc); 
		 }
	 });
	});

router.get('/register', function(req, res, next) {
  		res.render('stage/register',{tips:''});
	});
router.post('/register', function(req, res) {
	console.log(req.body);
	if(req.body.bp===req.session.password){
		console.log("修改密码");
		return res.json(JSON.stringify({message:'success'}));
	}else{
		return res.json(JSON.stringify({message:'false'}));
	}
});

router.get('/index',function(req,res){
	     console.log(req.cookies);
	     if(req.cookies.name){
	    	 res.render('stage/index');
	     }else{
	    	 res.cookie('isVisit',1,{maxAge:60*1000});
	    	 res.render('stage/login',{tips:'请先登录'});
	     }
	
});
router.post('/index',function(req,res){
	console.log(req.body.name);
	 dbLogin.findOne({name:req.body.name},function(err,doc){
		 console.log(err+','+doc);
		 if(doc){
			 if(doc.password===req.body.password){
				 console.log('33');
				 res.cookie('name',req.body.name,{maxAge:60*1000});
				 req.session.password=doc.password;
				 res.render('stage/index');
			 }else{
				 res.render('stage/login',{tips:'密码不正确，请重新输入；'});
			 }
			 console.log(doc.password);
		 }else{
			 res.render('stage/login',{tips:'用户名错误，请重新输入。'});
			 console.log(doc); 
		 }
	 });
	 
});

router.get('/quit',function(req,res){
	var loginName=req.cookies.name;
	delete req.session.password;
	res.clearCookie('loginName');
	 res.redirect('./login');
});

router.post('/modifyPassword.action',function(req,res){
	console.log(req.body);
	console.log(req.cookies.password);
	console.log(req.session);
	if(req.body.bp===req.session.password){
		 dbLogin.update({'name':req.cookies.name},{'$set':{password:req.body.qp}},function(err){
				console.log(err);
				req.session.password=req.body.qp;
				console.log("修改密码");
				return res.json(JSON.stringify({message:'success'}));
			});
	}else{
		return res.json(JSON.stringify({message:'false'}));
	}
});

router.post('/type.action',function(req,res){
	res.json(JSON.stringify({message:'success'}));
});

module.exports = router;
