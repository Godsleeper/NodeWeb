var express = require("express");
var path = require('path');
var mongoose = require('mongoose')
var Movie = require('./models/movie');
var _ =require('underscore')
var port = process.env.PORT||3000;//当前环境变量的端口号
var app = express();


mongoose.connect('mongodb://localhost/NodeWeb')

app.set("views","./views/pages")//参数为views，设置视图文件目录
app.set("view engine","jade");//模板引擎为jade,MVC中的v视图由模板引擎创建html
app.use(express.bodyParser())//使用中间件解析post请求
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log(port)

//编写路由
app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		//渲染模版引擎生成的页面
	res.render('index',{
		title:"NodeWeb 首页",
		movies:movies
		})
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


app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id;
	var movieobj = req.body.movie;
	var _movie;
	//id不是未声明的，说明已经存储过了
	if(id!=undefined){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}

		_movie = _.extent(movie,movieobj);
		_movie.save(err,function(){
			if(err){
				console.log(err)
			}
			res.redirect("/movie/"+movie._id)
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
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'NodeWeb 后台更新页',
				movie:movie
			})
		})
	}
})


app.get('/movie/:id',function(req,res){
	var id = req.params.id;

	Movie.findById(id,function(err,movie){
		res.render('detail',{
		title:"NodeWeb"+movie.title,
		movie:movie
	})
	})
	
})

app.get('/admin/list',function(req,res){

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