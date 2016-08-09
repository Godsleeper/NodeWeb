var _= require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var fs = require('fs');
var path = require('path');
//编写管理页路由
exports.new = function(req,res){
	Category.find({},function(err,categories){
	res.render('admin',{
		title:"后台管理页",
		movie:{},
		categories:categories,
		})
	})
};

//重定向，每次post生成一个新的详情页，最后重定向到那一页，不能够重新render
exports.save=function(req,res){
//判断
	var id = req.body.movie._id;//获取的post上的数据，经过处理是一个json对象
	var movieobj = req.body.movie;
	var _movie;

	if(req.poster){
		movieobj.poster=req.poster;
	}
	//id不是未声明的，说明已经存储过了
	if(id){
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
				_movie = new Movie(movieobj);
				var categoryId = movieobj.category;//拿到这部新增电影的类别
				var categoryName = movieobj.categoryName;//拿到这部电影自定义的类别

		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			if(categoryId){
				Category.findById(categoryId,function(err,category){
					category.movies.push(movie._id);//这一条文档中的movie为空，添加一条电影的id
					category.save(function(err,categories){
					res.redirect("/movie/"+movie._id)	
					})
				})	
			}else if(categoryName){
				var category = new  Category({
					name:categoryName,
					movies:[movie._id]//新分类下的电影，这是第一条
				})

				category.save(function(err,categories){
					movie.category = categories._id; 
					movie.save(function(err,movie){
					res.redirect("/movie/"+movie._id)	
					})
				})

			}
		})
	}
};


//编写更新页，将数据库的信息拿出去重新取出，只是渲染一个页面，具体的数据库操作通过submit，地址是admin/new
exports.update = function(req,res){
	var id = req.params.id;//使用params拿到路由信息的id，传给id
	if(id){
		Movie.findById(id,function(err,movie){
			Category.find({},function(err,categories){
				res.render('admin',{
					title:'后台更新页',
					movie:movie,//jade只使用了movie中部分字段的信息，全传进去选择需要的即可
					categories:categories
				})
			})
		})
	}
};

//编写详情页，get就是服务器用来处理get请求的路由函数
exports.detail = function(req,res){
	var id = req.params.id;
	Movie.update({_id:id},{$inc:{pv:1}},function(err){
		if(err){console.log(err);}
	});

	Movie.findById(id,function(err,movie){
		//在comment中找，当前url中的id和movie中id对应的那条评论
		Comment
		.find({movie:id})
		.populate('from','name')
		.populate('reply.from reply.to','name')
		.exec(function(err,comments){
				res.render('detail',{
				title:movie.title,
				movie:movie,
				comments:comments
			})	
		})
	})	
};

//编写列表页
exports.list = function(req,res){
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
};

//编写处理删除的路由
exports.del = function(req,res){
	var id = req.query.id;//url以delete的方式发来了要删除的admin/list?id=*****
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				res.json({success:1})//没有异常返回json数据
			}
		})
	}
};

exports.saveImage = function(req,res,next){
	var posterData = req.files.uploadPoster;//从files中取出的数据
	var filePath = posterData.path;//取路径	
	var originalFilename = posterData.originalFilename;
	console.log("啥东西啊这是为啥undefined"+originalFilename)

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp=Date.now();
			var type = posterData.type.split('/')[1];
			var poster =timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','/public/upload/'+poster);
			console.log("filepath:"+filePath);
			console.log("newpath:"+newPath);		
			console.log("type:"+type);		
			fs.writeFile(newPath,data,function(err){
				req.poster = poster;
				next();
			})
		})
	}else{
		next();
	}
};