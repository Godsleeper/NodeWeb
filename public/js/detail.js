$(function(){
	$(".comment").click(function(e){	
		var toId = $(this).attr("data-tid");//评论用户的id,你评论的是哪一个用户
		var commentId = $(this).attr("data-cid");//评论的id，你评论的是哪一条评论
		if($("#toId").length>0){
			$("#toId").val(toId)
		}else{
			$('<input>').attr({
				type:'hidden',
				id:'toId',
				name:'comment[tid]',
				value:toId
			}).appendTo('#commentForm');
		}

		if($("#commentId").length>0){
			$("#commentId").val(commentId)
		}else{
			$('<input>').attr({
				type:'hidden',
				id:'commentId',
				name:'comment[cid]',
				value:commentId
			}).appendTo('#commentForm');
		}	
	})
})