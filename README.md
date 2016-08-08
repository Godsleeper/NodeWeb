# NodeWeb
使用node+jade+express搭建电影网站

使用工具：前端：Bootstrap jquery javascript less
          后端  nodejs express jade 
          自动化工具 grunt

功能：1.帐户：登录：权限控制，检测是否存在用户名，密码是否正确，持久化处理
              注册：加密算法，是否已存在用户
      2.电影：新增：豆瓣api添加新电影
              分类：可选电影分类，首页通过不同类别显示
              本地上传：可本地上传电影海报
              搜索：模糊搜索电影
              分页：电影列表每次只展示前五个，可以分页
      3.评论：可实现不同用户相互评论
      4.其他：访问监控
      
 路由规划：/index 首页 index/movie/:id 电影详情页index/result?q= 电影查询页index/category=&p= 电影分类页index/signup 注册
index/signin 登录
管理员：index/admin/movie/new 新增电影 index/admin/movie/list 电影管理index/admin/category/new 新增分类
index/admin/category/list 分类管理index/admin/category/new 新增分类index/admin/category/list 分类管理
           
