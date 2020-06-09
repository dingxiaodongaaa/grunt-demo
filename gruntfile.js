// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接受一个 grunt 的形参，内不提供一些创建任务时用到的 API

// module.exports = grunt => {
//     grunt.registerTask('foo', ()=> {
//         console.log('hello grunt')
//     })

//     grunt.registerTask('bar', '任务描述', () => {
//         console.log('other task')
//     })

//     grunt.registerTask('default', ['foo', 'bar'])

//     // grunt.registerTask('task-async', () => {
//     //     setTimeout(() => {
//     //         console.log('async-task')
//     //     },1000)
//     // })

//     // 异步任务需要 this.async() 返回一个done函数来声明任务的结束
//     grunt.registerTask('task-async', function(){
//         const done = this.async()
//         setTimeout(() => {
//             console.log('async-task')
//             done()
//         },1000)
//     })
// }

// 标记失败任务
// module.exports = grunt => {
//     grunt.registerTask('foo', () => {
//         console.log('foo')
//     })

//     grunt.registerTask('bad', () => {
//         return false
//     })

//     grunt.registerTask('bar', () => {
//         console.log('bar')
//     })

//     grunt.registerTask('default', ['foo', 'bad', 'bar'])

//     grunt.registerTask('async-task', function(){
//         const done = this.async()
//         setTimeout(() => {
//             console.log('async-task')
//             done(false)
//         },1000)
//     })
// }


// 配置项
// module.exports = grunt => {
//     grunt.initConfig({
//         foo:'foo',
//         foo1: {
//             bar: 'bar'
//         }
//     })

//     grunt.registerTask('foo', () => {
//         console.log(grunt.config('foo'))
//         console.log(grunt.config('foo1.bar'))
//     })
// }

// 多目标任务
// module.exports = grunt => {
//     grunt.initConfig({
//         build:{
//             options: {
//                 foo:'foo'
//             },
//             css: {
//                 options: {
//                     foo:'foo1'
//                 },
//                 value: 'value'
//             },
//             js: 2
//         },
//     })
//     grunt.registerMultiTask('build', function() {
//         console.log(this.options())
//         console.log(`target: ${this.target}, data: ${this.data}`)
//     })
// }


/**
 * 插件的使用
 */

// module.exports = grunt => {
//     grunt.initConfig({
//         // 删除temp文件夹下面的app.js
//         // clean: {
//         //     temp: "temp/app.js"
//         // }
//         // 删除temp文件夹下面的所有的 txt 文本
//         // clean: {
//         //     temp: "temp/*.txt"
//         // }
//         // 删除temp文件夹下面的所有文件以及所有子目录下面的所有文件
//         clean: {
//             temp: "temp/**"
//         }
//     })
//     grunt.loadNpmTasks('grunt-contrib-clean')
// }

/**
 * Grunt 常用插件
 */

const loadGruntTasks = require("load-grunt-tasks") // 自动加载所有安装的 grunt 插件的的插件
const sass = require("sass")

module.exports = grunt => {
    grunt.initConfig({
        sass:{
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options:{
                // 配置选项 将所有的ES新特性转换成ES5
                presets: ['@babel/preset-env'],
                sourceMap: true
            },
            main: {
                files:{
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })
    // grunt.loadNpmTasks("grunt-sass")
    loadGruntTasks(grunt) // 自动加载所有的 Grunt 插件中的任务
    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}
