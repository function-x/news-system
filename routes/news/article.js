var Article=require("../../model/article");
module.exports=require('express').Router()
	.post("/save",function(req,res,next){
		var jsonData=req.body;
		var num=0;
		Article.count({},function(err,count){
			if(err){
				console.log(err);
			}else{
				num=count;
			}
		});
		new Article({
			articleId:(num+1).toString(),
			title:jsonData.title,
			typeId:jsonData.typeId,
			author:jsonData.author,
			content:jsonData.content,
			updateTime:jsonData.updateTime,
			visitors:jsonData.visitors,
			imgId:jsonData.imgId,
			send:'no'
		}).save(function(err,article){
			if(err){
				console.log(err);
				res.json({
					code:-1,
					msg:'err',
					body:{}
				})
			}else if(article){
				res.json({
					code:0,
					msg:'ok',
					body:{
						articleId:article.articleId
					}
				});
			}
		});
	})
	.post("/send",function(req,res,next){
		var articleId=req.body.articleId;
		Article.findOneAndUpdate(
			{articleId:articleId},
			{send:"yes"},
			function(err,article){
				if(err){
					res.json({
						code:-1,
						msg:'err',
						body:{}
					});
				}
				else if(article){
					res.json({
						code:0,
						msg:'ok',
						body:{}
					});
				}
			});
	})
	.post("/saveAndSend",function(req,res,next){
		var jsonData=req.body;
		var num=0;
		Article.count({},function(err,count){
			if(err){
				console.log(err);
			}else{
				num=count;
			}
		});
		new Article({
			articleId:(num+1).toString(),
			title:jsonData.title,
			typeId:jsonData.typeId,
			author:jsonData.author,
			content:jsonData.content,
			updateTime:jsonData.updateTime,
			visitors:jsonData.visitors,
			imgId:jsonData.imgId,
			send:'yes'
		}).save(function(err,article){
			if(err){
				console.log(err);
				res.json({
					code:-1,
					msg:'err',
					body:{}
				})
			}else if(article){
				res.json({
					code:0,
					msg:'ok',
					body:{
						articleId:article.articleId
					}
				});
			}
		});
	})
	.post("/edit",function(req,res,next){
		var reqDoc=req.body;
		var artId=req.body.articleId;
		Article.findOneAndUpdate({articleId:artId},reqDoc,function(err,article){
			if(err){
				res.json({
					code:-1,
					msg:'err',
					body:{}
				});
			}
			else if(article){
				res.json({
					code:0,
					msg:'ok',
					body:{}
				});
			}
		});
	})
	.post("/detail",function(req,res,next){
		var artId=req.body.articleId;
		Article.findOne({articleId:artId},function(err,article){
			if(err){
				res.json({
					code:-1,
					msg:'err',
					body:{}
				});
			}else if(article){
				var num=article.visitors+1;
				Article.update({articleId:artId},{"visitors":num},function(err,doc){
					if(err){
						console.log(err);
						res.json({
						code:-1,
						msg:'err',
						body:{}
						});
					}
				});
				res.json({
					code:0,
					msg:'ok',
					body:article
				});
			}
		});
	})
	.post("/newsList",function(req,res,next){
		var num=req.body.num;
		var offset=req.body.offset;
		var filter=req.body.filter;
		Article.find({typeId:filter,send:"yes"},function(err,articles){
			if(err){
				res.json({
					code:-1,
					msg:'err',
					body:{}
				});
			}else if(articles){
				if(offset*num<=articles.length){
					var arts=sort(articles,filter,1).slice();
					if((offset+1)*num>articles.length)
						end=articles.length;
					else
						end=(offset+1)*num;
					res.json({
						code:0,
						msg:'ok',
						body:arts.slice(offset*num,end)
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
	})
	.post("/zan",function(req,res,next){
		var articleId=req.body.articleId;
		var userId=req.body.userId;
		Article.findOne({"articleId":articleId},function(err,article){
			if(err){
				res.json({
					code:-1,
					msg:"err",
					body:{}
				});
			}
			else if(article){
				var num=article.appreciationsNum;
				var appreciationers=article.appreciationers.slice(0);
				var flag=0;
				var i=0;
				for(i=0;i<article.appreciationers.length;i++)
					if(article.appreciationers[i]==userId){
						num--;
						appreciationers.splice(i,1);
						flag=1;
					}
				if(!flag){
					num++;
					appreciationers.push(userId);
				}
				Article.update({"articleId":articleId},{"appreciationsNum":num,"appreciationers":appreciationers},function(err,doc){
					if(err){
						res.json({
							code:-1,
							msg:"err",
							body:{}
						});
					}else if(doc){
						res.json({
							code:0,
							msg:"ok",
							body:{"num":num,"users":appreciationers}
						});
					}
				});
			}
		});
		
	});
	
	
	function sort(articles,filter,flag){
		var len=articles.length;
		var i,j;
		var tempdoc;
		for(i=0;i<len;i++){
			for(j=i;j<len;j++)
				if(flag*articles[i].filter<flag*articles[j].filter){
					tempdoc=articles[i];
					articles[i]=articles[j];
					articles[j]=tempdoc;
				}
		}
		return articles;
	}
	