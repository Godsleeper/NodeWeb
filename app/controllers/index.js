var Movie = require('../models/movie');
var Category = require('../models/category');


//编写主页路由
exports.index=function(req,res){
	Category
	.find({})
	.populate({
    	path:'movies',
    	options:{limit:5}
    })
    .exec(function(err,categories){
    	if(err){
		console.log(err);}

	//渲染模版引擎生成的页面
	res.render('index',{
		title:"爱电影",
		categories:categories
		})
    })	
};

exports.search = function(req,res){
	var catId = req.query.cat;//用get从url传入搜索字符串
	var page = req.query.p;
	var index = page*2;

	Category
	.find({_id:catId})
	.populate({
    	path:'movies',
    	options:{limit:2,skip:index}
    })
    .exec(function(err,categories){
    	if(err){
		console.log(err);}

		var category = categories[0]||{};
	res.render('results',{
		title:"查询结果",
		keyword:category.name,
		category:categories[0]
		})
    })	
};