module.exports=function(grunt){

	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true//文件发生改动能重新启动
				}
			},
			js:{
				files:['public/js/**','module/*.js','schemas/*.js'],
				//tasks:['jshint'],
				options:{
					livereload:true
				}
			}
		},

		nodemon:{
			dev:{
				scripts:'app.js',
				options:{
					args:[],
					ignoredFiles:['README.md','node_modules/**','DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},

		// mochaTest:{
		// 	options:{
		// 		reporter:'spec'
		// 	},
		// 	src:['test/**/*.js']
		// },

		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	})//初始化对象
	grunt.loadNpmTasks('grunt-contrib-watch')//有文件添加修改会重新执行注册好的任务
		grunt.loadNpmTasks('grunt-nodemon')//实时监听入口文件app.js，有修改会自动重启
		grunt.loadNpmTasks('grunt-concurrent')//慢任务的处理，包括sass，less等的编译
		grunt.loadNpmTasks('grunt-mocha-test')
		grunt.option('force',true)//开发的时候，因为语法的错误而中断整个服务
		
		grunt.registerTask('default',['concurrent'])//注册一个任务
		grunt.registerTask('test',['mochaTest'])//注册一个任务

}