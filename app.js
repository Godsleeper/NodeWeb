var express = require("express");
var path = require('path');
var port = process.env.PORT||3000;//当前环境变量的端口号
var app = express();


app.set("views","./views/pages")//参数为views，设置视图文件目录
app.set("view engine","jade");//模板引擎为jade,MVC中的v视图由模板引擎创建html
app.use(express.bodyParser())//使用中间件解析post请求
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log(port)

//编写路由
app.get('/',function(req,res){
	res.render('index',{
		title:"imooc 首页",
		movies:[{
			title:'小鬼当家',
			_id:1,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'小鬼当家',
			_id:2,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'小鬼当家',
			_id:3,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'小鬼当家',
			_id:4,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'小鬼当家',
			_id:5,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'小鬼当家',
			_id:6,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		}]
	})
})

app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:"后台管理页",
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})

app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:"详情页",
		movie:{
			doctor:"张艺谋",
			country:'China',
			title:'小鬼当家',
			year:2000,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
		}
	})
})

app.get('/admin/list',function(req,res){
	res.render('list',{
		title:"列表页",
		movies:[{
			_id:1,
			doctor:"张艺谋",
			country:'China',
			title:'小鬼当家',
			year:2000,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
		},{
			_id:1,
			doctor:"张艺谋",
			country:'China',
			title:'小鬼当家',
			year:2000,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
		},{
			_id:1,
			doctor:"张艺谋",
			country:'China',
			title:'小鬼当家',
			year:2000,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
		}]
	})
})