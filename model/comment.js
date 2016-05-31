var mongoose=require('mongoose');
var Schema=mongoose.Schema;
module.exports=mongoose.model('comment',new Schema({
	commentId:{
		type:String,
		required:'miss commentId',
		unique:true
	},
	articleId:{
		type:String,
		required:'miss articleId'
	},
	reviewerId:{
		type:String,
		required:'miss reviewerId'
	},
	content:{
		type:String,
		required:'miss content'
	},
	createTime:{
		type:String,
		required:'miss createTime'
	}
}));