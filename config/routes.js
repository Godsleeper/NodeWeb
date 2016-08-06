var _= require('underscore');
var Movie = require('../models/movie');
var User = require('../models/user');
module.exports = function(app){
	//使用use调用静态方法的办法来预处理session，检测有无session，如果有，存为本地变量，每一个jade都可以接收到状态
app.use(function(req,res,next){
	var _user = req.session.user;//将session存为本地变量
	if(_user){
		app.locals.user = _user;//session存在locol中当作本地变量，每一个jade都可以拿到，不需要每次render的时候传入
	}
		return next();//将控制权交给下面
})

//编写主页路由
app.get('/',function(req,res){
	console.log(req.session.user);
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

//编写更新页，将数据库的信息拿出去重新取出，只是渲染一个页面，具体的数据库操作通过submit，地址是admin/new
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;//使用params拿到路由信息的id，传给id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'电影网站 后台更新页',
				movie:movie//jade只使用了movie中部分字段的信息，全传进去选择需要的即可
			})
		})
	}
})


//编写详情页，get就是服务器用来处理get请求的路由函数
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

//编写处理删除的路由
app.delete('/admin/list',function(req,res){
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
})

//注册模块
app.post('/user/signup',function(req,res){
	var _user = req.body.user;//使用bodyparser将body转换为对象
	
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		if(user.length>0){
			return res.redirect('/');
		}else{
			var users = new User(_user);	
			users.save(function(err,user){
				if(err){
					console.log(err);}
			res.redirect('/admin/userlist');
			})
		}
	})	
});

//用户管理模块
app.get('/admin/userlist',function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		//渲染模版引擎生成的页面
		res.render('userlist',{
			title:"用户列表页",
			users:users
		})
	})
});

//登录模块
app.post('/user/signin',function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findOne({name:name},function(err,user){
		if(err){console.log(err);}
		if(!user){
			console.log('没有用户名');
			return res.redirect('/');//如果没有这个人,返回首页
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){console.log(err)}
			if(isMatch){
				req.session.user=user;
				console.log('密码正确');
				return res.redirect('/');
			}else{
				console.log('密码错误');
			}
		})
	})
});

//登出
app.get('/logout',function(req,res){
	delete req.session.user;
	delete app.locals.user;
	res.redirect('/');
});
};

