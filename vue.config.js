const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
  ? './'
  : './'

module.exports = {
  baseUrl: BASE_URL,
  outputDir: 'dist',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      filename: 'index.html',
      title: "大屏可视化",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  parallel: require('os').cpus().length > 1,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },

  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    quiet: false,
    watchOptions: {
      poll: true
    },
    // 在浏览器上全屏显示编译的errors或warnings。
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
