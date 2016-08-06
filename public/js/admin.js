$(function(){
	$(".del").click(function(e){	
		var id = $(this).attr("data-id");
		var tr = $('.item-id-'+id);
		$.ajax({
			type:'DELETE',
			url:'/admin/movie/list?id='+id
		}).done(function(results){//相应的readystatecallback
			if(results.success==1){
				if(tr.length>0){
					tr.remove();
				}
			}
		})
	})
})