var express = require("express");
var path = require('path');//处理路径的模块
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express);
var multipart = require('connect-multiparty');


var port = process.env.PORT||3000;//当前环境变量的端口号
var app = express();

app.locals.moment = require('moment')
var dbURL = 'mongodb://localhost/imooc'
mongoose.connect(dbURL);//连接数据库

app.set("views","./app/views/pages")//参数为views，设置视图文件目录
app.set("view engine","jade");//模板引擎为jade,MVC中的v视图由模板引擎创建html

app.use(multipart());
app.use(express.bodyParser());//使用中间件解析post请求
app.use(express.static(path.join(__dirname,'public')));//设置静态文件地址，都在public下
app.use(express.cookieParser());
app.use(express.session({
	secret:'imooc',
	store:new mongoStore({
		url:dbURL,
		collection:'sessions'

	})
}))

//判断代码执行环境来输出错误信息
if('development'==app.get('env')){
	app.set('showStackError',true);//可以将错误信息打印
	app.use(express.logger(':method :url :status'))//输出请求类型 url 状态
	app.locals.pretty = true;
	mongoose.set('debug',true);
}

require('./config/routes')(app);

app.listen(port)

console.log(port)

