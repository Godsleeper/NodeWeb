var Movie = require('../models/movie');


//编写主页路由
exports.index=function(req,res){
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
}