var Index = require('../app/controllers/index')
var User= require('../app/controllers/user')
var Movie= require('../app/controllers/movie')



module.exports = function(app){
	//使用use调用静态方法的办法来预处理session，检测有无session，如果有，存为本地变量，每一个jade都可以接收到状态
app.use(function(req,res,next){
	var _user = req.session.user;//将session存为本地变量
	app.locals.user = _user;//session存在locol中当作本地变量，每一个jade都可以拿到，不需要每次render的时候传入
	next();//将控制权交给下面
})


//************************主页的路由规划*****************************
app.get('/',Index.index);

//************************电影页的路由规划*****************************
//详情页
app.get('/movie/:id',Movie.detail);
//列表页
app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);
//删除的功能
app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del);
//更新的功能
app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update);
//添加页
app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save);
//管理页
app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new);


//************************用户的路由规划*****************************
//注册模块
app.post('/user/signup',User.signup);
//登陆模块
app.post('/user/signin',User.signin);
//登出模块
app.get('/logout',User.logout)
//用户管理模块
app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list);
//登录显示
app.get('/signin',User.showSignin);
//注册显示
app.get('/signup',User.showSignup);

};
