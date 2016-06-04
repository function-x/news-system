var Img=require("../../model/image");
var Buffer=require("buffer").Buffer;
module.exports=require("express").Router()
	.post("/send",function(req,res,next){
		var img=req.body.img;
		var bufImg=new Buffer(img,"base64");
		var num=0;
		Img.count({},function(err,ImgNum){
			if(err){
				return ;
			}else
				num=ImgNum;
		});
		new Img({
			imgId:(num+1).toString(),
			image:bufImg
		}).save(function(err,img){
			if(err){
				res.json({
					code:-1,
					msg:'err',
					body:{}
				});
			}else if(img){
				res.json({
					code:0,
					msg:'ok',
					body:{
						imgId:(num+1).toString()
					}
				});
			}
		});
	})
	.post("/get",function(req,res,next){
		var id=req.body.id;
		Img.findOne({imgId:id},function(err,img){
			if(err){
				res.json({
					code:-1,
					msg:"err",
					body:{}
				});
			}else if(img){
				res.json({
					code:0,
					msg:"ok",
					body:{
						image:img
					}
				});
			}
		});
	});