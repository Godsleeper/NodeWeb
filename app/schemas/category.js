var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId



var CategorySchema = new Schema({
	name:String,
	movies:[{type:ObjectId,ref:'Movie'}],
	meta:{
		createdAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})


CategorySchema.pre('save',function(next){//存储之前的预处理方法
	if(this.isNew){
		this.meta.createdAt = this.meta.updateAt = Date.now();//首次录入，将新建时间和更新时间设为现在
	}else{
		this.meta.updateAt = Date.now();//之后录入，只更新更新时间
	}
	next();//将对象给到下一个，否则只响应最先定义的那个
})

//添加静态方法，在模型层存储数据库时就可用
CategorySchema.statics = {
	//取出数据库中所有的数据
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')//按更新时间排序
		.exec(cb);//执行回调方法
	},
	//查询单条数据
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb);
	}
}

module.exports = CategorySchema;