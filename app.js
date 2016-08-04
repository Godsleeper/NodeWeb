var express = require("express");
var path = require('path');
var mongoose = require('mongoose')
var Movie = require('./models/movie');
var _= require('underscore');
var port = process.env.PORT||27017;//当前环境变量的端口号
var app = express();


mongoose.connect('mongodb://localhost/imooc')

app.set("views","./views/pages")//参数为views，设置视图文件目录
app.set("view engine","jade");//模板引擎为jade,MVC中的v视图由模板引擎创建html
app.use(express.bodyParser())//使用中间件解析post请求
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)
app.locals.moment = require('moment')
console.log(port)

//编写主页路由
app.get('/',function(req,res){
	//fetch：取出所有数据，按查询时间排序，执行回调函数
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		//渲染模版引擎生成的页面
	res.render('index',{
		title:"电影网站 首页",
		movies:movies//将取出的movies渲染到首页中，包括(_id,title,poster)
		})
	})	
})
//编写管理页路由
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


//重定向，每次post生成一个新的详情页，最后重定向到那一页，不能够重新render
app.post('/admin/movie/new',function(req,res){
	//判断
	var id = req.body.movie._id;//获取的post上的数据，经过处理是一个json对象
	var movieobj = req.body.movie;
	var _movie;
	//id不是未声明的，说明已经存储过了
	if(id!=='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
		//underscore方法，用对象的新字段代替老字段，存在临时变量_movie中，再将_movie存储
		_movie = _.extend(movie,movieobj);
		_movie.save(function(err,movie){
			if(err){
				console.log(err);
			}
			res.redirect("/movie/"+movie._id);	
			})
		})
	}else{
			_movie = new Movie({
			doctor:movieobj.doctor,
			title:movieobj.title,
			country:movieobj.country,
			language:movieobj.language,
			flash:movieobj.flash,
			summary:movieobj.summary,
			poster:movieobj.poster,
			year:movieobj.year,
		});
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			res.redirect("/movie/"+movie._id)
			})
	}
})


app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;//使用params拿到路由信息的id，传给id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'电影网站 后台更新页',
				movie:movie
			})
		})
	}
})


//编写详情页
app.get('/movie/:id',function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		res.render('detail',{
		title:"电影网站"+movie.title,
		movie:movie
		})
	})	
})


//编写列表页
app.get('/admin/list',function(req,res){
	//注意区分，Movie是数据库对象，在整个数据库中使用函数进行crud的操作，movies是具体通过语句查询出的一条或多条数据
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		//渲染模版引擎生成的页面
		res.render('list',{
			title:"列表页",
			movies:movies
		})
	})
})