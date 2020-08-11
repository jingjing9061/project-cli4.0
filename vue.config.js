
let glob = require('glob')

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {}, tmp, htmls = {};

    // 读取src/pages/**/底下所有的html文件
    glob.sync(globPath+'html').forEach(function(entry) {
        tmp = entry.split('/').splice(-3);
        htmls[tmp[1]] = entry
    })

    // 读取src/pages/**/底下所有的js文件
    glob.sync(globPath+'js').forEach(function(entry) {
        tmp = entry.split('/').splice(-3);
        entries[tmp[1]] = {
            entry,
            template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html', //  当前目录没有有html则以共用的public/index.html作为模板
            filename:tmp[1] + '.html'   //  以文件夹名称.html作为访问地址
        };
    });
    return entries;
}
let htmls = getEntry('./src/pages/**/*.');//　 
module.exports = {
    pages:htmls,
    publicPath: './',           //  解决打包之后静态文件路径404的问题
    // outputDir: 'output',        //  打包后的文件夹名称，默认dist
    devServer: {
        open: true,             //  npm run serve 自动打开浏览器
        index: '/index.html'    //  默认启动页面
    }
}



// module.exports = {
//   pages: {
//       index: {
//         // page 的入口
//         entry: 'src/pages/projectA/main.js',
//         // 模板来源就是在public里面创建的入口文件名
//         template: 'public/index.html',
//         // 编译后在 dist文件夹中的输出文件名，可选项，省略时默认与模块名一致
//         filename: 'index.html',
//         // 当使用 title 选项时，
//         // template 中的 title 标签需要时 <title><%= htmlWebpackPlugin.options.title %></title>
//         title: 'index',
//         // 在这个页面中包含的块，默认情况下会包含
//         // 提取出来的通用 chunk 和 vendor chunk。
//         chunks: ['chunk-vendors', 'chunk-common', 'index']
//       },
//       // 当使用只有入口的字符串格式时，也就是只有entry属性时，直接用字符串表示模块入口
//       test: {
//         // page 的入口
//         entry: 'src/pages/projectB/test.js',
//         // 模板来源就是在public里面创建的入口文件名
//         template: 'public/test.html',
//         // 编译后在 dist文件夹中的输出文件名，可选项，省略时默认与模块名一致
//         filename: 'test.html',
//         // 当使用 title 选项时，
//         // template 中的 title 标签需要时 <title><%= htmlWebpackPlugin.options.title %></title>
//         title: 'test标题'
//       }
//     }
// }







  