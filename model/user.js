var mongoose=require('mongoose');
var Schema=mongoose.Schema();
module.exports=mongoose.model('user',new Schema({
	username:{
		type:String,
		required:'miss name',
		unique:true,
	},
	password:{
		type:String,
		required:'miss password',
	}
}));