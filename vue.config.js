const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const port = process.env.port || process.env.npm_config_port || 8088
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: false,
  publicPath: '/[DVF]/',
  outputDir: process.env.VUE_APP_BASE_URL === 'http://testaiapi.blhltd.com' ? 'dist' : 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: port,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        // 如果要代理 websockets
        ws: false,
        changeOrigin: true,
        pathRewrite: {   //重写路径，这种是没有我们定义的前缀
          '^/api': ''
        }
      },
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
  },
})
