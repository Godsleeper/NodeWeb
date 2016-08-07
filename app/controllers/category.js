var Category = require('../models/category');

//编写管理页路由
exports.new = function(req,res){
	res.render('categoryadmin',{
		title:"分类录入页",
		category:{}
	})
};


exports.save=function(req,res){
	var _category = req.body.category;
	var category = new Category(_category);
	category.save(function(err,category){
		if(err){
			console.log(err)
		}
		res.redirect("/admin/category/list")
	})
};


 exports.list = function(req,res){
 	Category.fetch(function(err,categories){
		if(err){
			console.log(err);
		}
		res.render('categorylist',{
			title:"分类列表页",
			categories:categories
		})
	})
 }
