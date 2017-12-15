const webpack = require('webpack');
const path = require('path');

// 插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 用于生成HTML
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 分离打包css

const PATHS = {
  app: path.join(__dirname, 'src'), // 项目开发路径
  build: path.join(__dirname, 'dist'), // 项目打包路径
};

const extractSass = new ExtractTextPlugin({
  filename: '[name].css', // css名字
  allChunks: true,
  ignoreOrder: true,
});

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8888,
    progress: true, // 显示进度
    overlay: { // 显示错误的配置
      errors: true,
      warnings: true,
    },
  },
  // entry: [
  //   'babel-polyfill',
  //   'react-hot-loader/patch',
  //   PATHS.app
  // ],
  entry: PATHS.app, // 指示 webpack 应该使用哪个模块（用于指定编译的源文件路径）
  output: {
    path: PATHS.build, // 指示 webpack 编译后的路径
    filename: '[name].js', // 指示 webpack 编译后的文件名字
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,  // 指定编译的文件类型
        exclude: /(node_modules)/, // 需要忽略的文件
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.(css|scss)$/, // scss 编译
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[name]_[local]_[hash:base64:5]', // class名格式
                sourceMap: true,
              }
            }, {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              }
            }
          ],
          fallback: 'style-loader'
        }) 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MyWebpack', // html 的title
      filename: 'index.html', // 生成的html文件名字
      template: './index.html' // 引用的html模板文件
    }),
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({ // 将公共的js模块单独打包到 commons.js文件中
      name: 'commons',
      // ( 公共chunk(commnons chunk) 的名称)
    
      filename: 'commons.js',
      // ( 公共chunk 的文件名)
    
      // minChunks: 3,
      // (模块必须被3个 入口chunk 共享)
    
      // chunks: ["pageA", "pageB"],
      // (只使用这些 入口chunk)
    })
  ]
}