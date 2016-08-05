$(function(){
	$('.btn-sign-in').click(function(e){
		var name = $('#signinName').val();
		var password = $('#signinPassword').val();
		$.ajax({
			url:'/user/signin',
			type:'POST',
			data:{
				name:name,
				password:password
			}
		}).done(function(result){
			if(result.success==1){
				alert('登陆成功')
			}else if(result.success==2){
				alert('密码不对')
			}else if(result.success==3){
				alert('没有这个用户名')
			}
		})
	})
})