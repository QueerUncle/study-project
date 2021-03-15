// const utils = require('./utils/utils');
const Timestamp = new Date().getTime();
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/order
const cbimConf = require('./utils/cbim.vue.Intermediate.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resolve = (dir) => path.join(__dirname, dir);

// 分析工具
const AnalyzerKey = false;
// eslint-disable-next-line import/no-extraneous-dependencies
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Gzip压缩
const CompressionWebpackPluginKey = true;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const VUE_APP_CUSTOM_ENV = process.env.VUE_APP_CUSTOM_ENV; // eslint-disable-line

module.exports = {
  // 模块化打包工具 - 2
  publicPath: cbimConf.publicPath,
  outputDir: cbimConf.outputDir,
  assetsDir: cbimConf.assetsDir,
  pages: cbimConf.pages,
  // 模块化打包工具 - 1
  // pages: utils.getPages(), // 自动生成多页信息  不带ui
  // outputDir: "dist",
  // assetsDir: "./",
  // publicPath: './', // 根域上下文目录

  productionSourceMap: !(process.env.VUE_APP_CUSTOM_ENV === 'production'),
  // 用于测试的代理服务
  devServer: {
    index: 'index-index.html',
    https: false,
    // proxy: 'http://10.80.2.11:8000/', // 运营管理平台
    proxy: 'http://10.80.12.7:8000/', // 裴姐
    // proxy: 'http://10.80.12.204:8300/', // 大涛
    // proxy: 'http://10.80.2.36:8300/', // 韩工
    // proxy: 'http:// 10.80.12.152:8300/', // 刘涛
    // proxy: 'http://10.80.12.210:8300/', // 晨明
    // proxy: 'http://10.80.2.64:8300/', // 王悦
    // proxy: 'http://10.80.2.24:8000/', // lvming
  },

  // 移动端适配 适合css预处理语言
  css:
    VUE_APP_CUSTOM_ENV === 'mobile' || VUE_APP_CUSTOM_ENV === 'mobileDev'
      ? {
          // eslint-disable-line
          loaderOptions: {
            postcss: {
              plugins: [
                require('postcss-plugin-px2rem')({
                  // eslint-disable-line
                  rootValue: 75, // 换算基数， 默认100 ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                  // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                  // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                  // propBlackList: [], //黑名单
                  exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                  // selectorBlackList: [], //要忽略并保留为px的选择器
                  // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，
                  // replace将自动设置为true。
                  // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                  mediaQuery: false, // (布尔值）允许在媒体查询中转换px。
                  minPixelValue: 3, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
                }),
              ],
            },
          },
        }
      : {},

  chainWebpack: (config) => {
    // eslint-disable-line
    // 移动端适配 适合css
    VUE_APP_CUSTOM_ENV === 'mobile' || VUE_APP_CUSTOM_ENV === 'mobileDev' // eslint-disable-line
      ? config.module
          .rule('css')
          .test(/\.css$/)
          .oneOf('vue')
          .resourceQuery(/\?vue/)
          .use('px2rem')
          .loader('px2rem-loader')
          .options({
            remUnit: 75,
          })
      : false;
  },

  // 约束打包大小的 webpack 配置
  configureWebpack: (config) => {
    config.optimization = {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        minSize: 102400,
        minChunks: 2,
        cacheGroups: {
          lib: {
            name: 'lib',
            test: /[vue|iview]/,
            priority: 0,
            chunks: 'all',
          },
          common: {
            name: 'common',
            chunks: 'initial',
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          sourceMap: false,
          terserOptions: {
            compress: {
              drop_console: process.env.NODE_ENV === 'production', // eslint-disable-line
            },
          },
        }),
      ],
    };

    // 分析插件
    if (AnalyzerKey) {
      config.plugins.push(new Analyzer());
    }
    // Gzip压缩
    if (CompressionWebpackPluginKey) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      );
    }
    // config.plugins.push(
    //   new MonacoWebpackPlugin({
    //     languages: ['javascript', 'css', 'html', 'typescript', 'json']
    //   })
    // )
    return {
      output: {
        // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
        filename: `js/[name].${Timestamp}.js`,
        chunkFilename: `js/[name].${Timestamp}.js`,
      },
    };
  },
};
