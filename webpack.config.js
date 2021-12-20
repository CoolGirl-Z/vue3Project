const path = require("path"); //导入nodejs中专门用来操作路径的模块
// 导入插件得到构造函数[自动清理dist目录下的旧文件]
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 创建插件实例化对象
const cleanPlugin = new CleanWebpackPlugin();

// 导入插件，得到构造函数[将src目录下的index.html首页复制到项目根目录一份]
const HtmlPlugin = require("html-webpack-plugin");
// 创建构造函数实例对象
const htmlPlugin = new HtmlPlugin({
  template: "./src/index.html", //制定源文件存放路径
  filename: "./index.html", //指定生成文件的存放路径
});
module.exports = {
  mode: "development", //mode指定项目构建模式，可选值development【开发阶段】，production【上线阶段】
  // devtool: "source-map",//可以指定错误行数，并暴露源代码【不安全】
  devtool: "nosources-source-map",//生产环境下可以指定错误行数，不显示源代码
  // devtool: "eval-source-map",//开发环境下可以指定错误行数，显示源代码
  entry: path.join(__dirname, "./src/index.js"), //打包入口文件路径
  output: {
    path: path.join(__dirname, "./dist"), //输出文件的存放路径
    filename: "js/bundle.js", //输出文件名称
  },
  plugins: [htmlPlugin, cleanPlugin], //挂在到该插件目录上
  // 通过devServer对webpack-dev-server插件进行更多的配置
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 80,
  },
  //所有第三方文件模块匹配规则
  module: {
    //文件后缀名匹配规则
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        //webpack5针对url-loader有特殊处理
        test: /\.(png|jpg|gif|jpeg)$/,
        type: "javascript/auto",
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10289, //表示限制图片转base64的大小限制单位是字节，当图片大小小于等于limit限制的时候，可以转为base64
              esModule: false,
              outputPath: "image", //若图片转为base64则不会生成文件夹
              // name: "assets/[name].[ext]",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: "/.js$/",
        exclude: "/node_modules", //表示排除项
        use: {
          loader: "babel-loader",
          options: {
            // 声明一个babel插件，此插件用来转换class中的高级语法
            plugins: ["@babel/plugin-propersal-class-properties"],
          },
        },
      },
    ],
  },
};
