var User=require("../../model/user");
module.exports=require("express").Router()
	.post("/login",function(req,res,next){
		var username=req.body.username;
		var password=req.body.pwd;
		User.findOne(
			{"username":username,},
			function(err,user){
				if(err){
					res.json({
						code:-1,
						msg:'err',
						body:{}
					});
				}else if(user){
					if(user.password==password){
						//success
						//user.password=null;
						res.json({
							code:0,
							msg:'ok',
							body:{}
						});
					}else{
						res.json({
							code:1,
							msg:'wrong username or password',
							body:{}
						});
					}
				}else {
					res.json({
						code:2,
						msg:'there is not the user',
						body:{}
					});
				}
			});
	})
	.post("/signup",function(req,res,next){
		var username=req.body.username;
		var pwd=req.body.pwd;
		if(username&&pwd){
			new User({
				username:username,
				password:pwd,
			}).save(function(err,user){
				if(user){
					console.log(err);
					res.json({
						code:-1,
						msg:'err',
						body:{}
					});
				}else{
					res.json({
						code:0,
						msg:'ok',
						body:{}
					});
					console.log("ok");
				}
			});
			
		}else{
			res.json({
				code:1,
				msg:'no password',
				body:{}
			});
		}
	});