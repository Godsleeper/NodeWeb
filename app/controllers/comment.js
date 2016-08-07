var Comment = require('../models/comment');



//存储评论
exports.save=function(req,res){
	//需要区分是正经回复还是回复评论
	var _comment = req.body.comment; 
	var movieId = _comment.movie;
	//如果有cid，说明是回复的评论，而不是直接评论
	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			var reply = {
				from:_comment.from,//评论用户的id
				to:_comment.tid,//评论的对象用户id
				content:_comment.content
			}
			comment.reply.push(reply);
			comment.save(function(err,comment){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/'+movieId)
			})
		})
	}else{
		var comment = new Comment(_comment);	
		comment.save(function(err,comment){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/'+movieId)
		})
	}
};

