var express = require("express")
var port = process.env.PORT||3000//当前环境变量的端口号
var app = express();


app.set("views","./views/pages")
app.set("view engine","jade");//模板引擎为jade,MVC中的v视图由模板引擎创建html
app.listen(port)

console.log(port)

//编写路由
app.get('/',function(req,res){
	res.render('index',{
		title:"首页"
	})
})

app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:"后台管理页"
	})
})

app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:"详情页"
	})
})

app.get('/admin/list',function(req,res){
	res.render('list',{
		title:"列表页"
	})
})