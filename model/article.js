var mongoose=require('mongoose');
var Schema=mongoose.Schema;
module.exports=mongoose.model('article',new Schema({
	articleId:{
		type:String,
		required:'miss articleId',
		unique:true,
	},
	title:{
		type:String,
	},
	typeId:{
		type:String,
		required:'miss typeId'
	},
	author:{
		type:String,
		required:'miss authorId',
	},
	content:{
		type:String,
	},
	updateTime:{
		type:Date,
	},
	visitors:{
		type:Number,
		default:0,
	},
	imageId:{
		type:String,
		default:0,
	},
	appreciationsNum:{
		type:String,
		default:"0"
	},
	appreciationers:{
		type:[String],
	},
	comment:{
		type:String,
		default:''
	},
	send:{
		type:String,
		required:'miss send'
	}
}));