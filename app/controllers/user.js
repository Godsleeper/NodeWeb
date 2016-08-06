var User = require('../models/user');

//注册模块
exports.signup = function(req,res){
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
};


//用户管理模块
 exports.list = function(req,res){
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
 }


//登陆模块
exports.signin = function(req,res){
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
				req.session.user=user;//设置一个session放在请求中
				console.log('密码正确');
				return res.redirect('/');
			}else{
				console.log('密码错误');
			}
		})
	})
};

//登出
exports.logout=function(req,res){
	delete req.session.user;//将请求中的session删除
	//delete app.locals.user;//将本地用来处理的session删除
	res.redirect('/');
}

