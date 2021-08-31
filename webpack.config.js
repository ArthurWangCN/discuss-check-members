const path = require("path");
const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const devMode = process.argv.indexOf('-p') === -1;

const config = {
  entry: devMode ? "./src/main.js" : "./src/index.js",

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'check-members.min.js',
    libraryTarget: 'umd',
    library: 'CheckMembers',
    libraryExport: 'default',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" }
        ]
      },
      {
          test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          loader: 'url-loader?limit=8192'
      }
    ]
  },

  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },

  resolve: {
    extensions: ['.js', '.vue']
  },
    // 开发配置
    devServer: require('./devServer.config.js'),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new uglify({
      uglifyOptions: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        },
      }
    }),
    new webpack.BannerPlugin({
      banner: `选人弹窗组件，更新时间：${new Date().toString()}`
    })
  ]
}

if(devMode) {
  config.devtool = 'eval-source-map'
  config.plugins.unshift(
    new HtmlwebpackPlugin({
      template: './src/index.html'
    })
  );
}

module.exports = config;