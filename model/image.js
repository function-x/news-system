var mongoose=require("mongoose");
var Schema=mongoose.Schema;
module.exports=mongoose.model('image',new Schema({
	imgId:{
		type:String,
		required:'miss imageId',
		unique:true
	},
	image:{
		type:Buffer,
		required:'miss image'
	}
}));