var express=require('express');
var path=require('path');
var favicon=require('serve-favicon');
var logger=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/newsDB');
var app=express();
var session=require('express-session');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
	secret:'SECRET_KEY',
	key:'SessionID',
	resave:false,
	saveUninitialized:true,
}));
app.use(express.static(path.join(__dirname,'public')));
app.use("/user",require("./routes/news/user"));
app.use("/image",require("./routes/news/image"));
app.use("/article",require("./routes/news/article"));
app.use("/comment",require("./routes/news/comment"));
module.exports=app;