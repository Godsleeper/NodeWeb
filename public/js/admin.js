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

$("#douban").blur(function(){
		var douban = $(this);
		var id = douban.val();
		if(id){
			$.ajax({
				url:"https://api.douban.com/v2/movie/subject/"+id,
				cache:true,
				dataType:'jsonp',
				type:'get',
				crossDomain:true,
				jsonp:'callback',
				success:function(data){
					$("#inputTitle").val(data.title)
					$("#inputDoctor").val(data.directors[0].name)
					$("#inputCountry").val(data.countries[0])
					$("#inputPoster").val(data.images.large)
					$("#inputYear").val(data.year)
					$("#inputSummary").val(data.summary)
				}
			})
		}
	})
})