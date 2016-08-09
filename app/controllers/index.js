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
	res.render('index1',{
		title:"爱电影",
		categories:categories
		})
    })	
};

exports.search = function(req,res){
	var catId = req.query.cat;//用get从url传入搜索字符串
	var page = parseInt(req.query.p)||0;
	var count = 2;
	var index = page*count;
	var q = req.query.q;

	if(catId){
		Category
		.find({_id:catId})
		.populate({
	    	path:'movies',//movies都是objectid，需要把title和poster取出来
	    	select:'title poster'//拿到需要的分类
	    })
	    .exec(function(err,categories){
	    	if(err){
			console.log(err);}

			var category = categories[0]||{};
			var movies = category.movies||[];
			var results = movies.slice(index,index+count);//每次取两个，movies已经具备了title和poster
		res.render('results',{
			title:"查询结果",
			keyword:category.name,
			currentPage:page+1,
			totalPage:Math.ceil(movies.length/2),
			movies:results,
			query:"cat="+catId,
			})
	    })
    }else{
    	Movie
    	 .find({title:new RegExp(q+'.*','i')})
    	 .exec(function(err,movies){
	    	 	if(err){
				console.log(err);}
				var results = movies.slice(index,index+count);//每次取两个，movies已经具备了title和poster
				res.render('results',{
					title:"查询结果",
					keyword:q,
					currentPage:(page+1),
					totalPage:Math.ceil(movies.length/2),
					movies:results,
					query:"q="+q,
    	 	})
    	})
    }	
};