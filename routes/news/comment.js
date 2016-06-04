var Comment=require("../../model/comment");
module.exports=require('express').Router()
	.post("/send",function(req,res,next){
		var comment=req.body;
		var num=0;
		Comment.count({},function(err,count){
			if(err){
				console.log(err);
			}else{
				num=count;
			}
		});
		new Comment({
			commentId:(num+1).toString(),
			articleId:comment.articleId,
			reviewerId:comment.reviewerId,
			content:comment.content,
			createTime:comment.createTime
		}).save(function(err,comment){
			if(err){
				res.json({
					code:-1,
					msg:'err',
					body:{}
				});
			}else if(comment){
				res.json({
					code:0,
					msg:'ok',
					body:{commentId:(num+1).toString()} 
				});
			}
		});
	})
	.post("/commentList",function(req,res,next){
		var artId=req.body.articleId;
		var num=req.body.num;
		var offset=req.body.offset;
		Comment.find({articleId:artId},function(err,comments){
			if(err){
				res.json({
					code:-1,
					msg:'err',
					body:{}
				});
			}else if(comments){
				if(offset*num<=comments.length){
					if((offset+1)*num>comments.length)
						end=comments.length;
					else
						end=(offset+1)*num;
					res.json({
						code:0,
						msg:'ok',
						body:comments.slice(offset*num,end)
					});
				}else{
					res.json({
						code:3,
						msg:"none",
						body:{}
					});
				}
			}
		});
	}).
	post("./delete",function(req,res,next){
		var cmtId=req.body.commentId;
		Comment.remove({commentId:cmtId},function(err){
			if(err){
				res.json({
					code:-1,
					msg:"err",
					body:{}
				});
			}else{
				res.json({
					code:0,
					msg:"ok",
					body:{}
				});
			}
		});
	});