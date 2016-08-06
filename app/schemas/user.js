var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR=10;
var UserSchema = new mongoose.Schema({
	name:{
		type:String,
		unique:true
	},
	password:String,
	role:{
		type:Number,
		default:0
	},
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


UserSchema.pre('save',function(next){//存储之前的预处理方法
	var user = this;//this指向当前的数据库模式，以这个模式生成的所有数据库在形成model时都要经过这样的算法
	//存储更新时间
	if(this.isNew){
		this.meta.createdAt = this.meta.updateAt = Date.now();//首次录入，将新建时间和更新时间设为现在
	}else{
		this.meta.updateAt = Date.now();//之后录入，只更新更新时间
	}
	//加密算法,先算出盐，再算出hash
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err){
				return next(err);
			}
			user.password=hash;
			next();//将对象给到下一个，否则只响应最先定义的那个
		})
	});
})


//添加实例方法，给具体找出的文档集合用
UserSchema.methods={
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err){return cb(err);}
			cb(null,isMatch);
		})
	}
}

//添加静态方法，在模型层存储数据库时就可用
UserSchema.statics = {
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

module.exports = UserSchema;