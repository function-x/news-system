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
		var user0=null;
		if(username&&pwd){
			User.findOne({username:username},function(err,user){
				if(err){
					res.json({
						code:-1,
						msg:"err",
						body:{}
					});
				}
				else
					user0=user;
			});
			if(user0){
				res.json({
					code:3,
					msg:"the username has existed",
					body:{}
				});
			}else{
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
					}
				});
			}
		}else{
			res.json({
				code:1,
				msg:'no password',
				body:{}
			});
		}
	});