const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const port = process.env.port || process.env.npm_config_port || 8080

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: false,
  publicPath: './',
  outputDir: process.env.NODE_ENV === 'development' ? 'test' : 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer:{
    host:'localhost',
    port:port,
    open:true,
    https:false,
    proxy:{
      [process.env.VUE_APP_BASE_API]: { //同济医院地址
        target: process.env.VUE_APP_BASE_URL,
        // 如果要代理 websockets
        ws: false,
        changeOrigin: true,
        pathRewrite: {   //重写路径，这种是没有我们定义的前缀
          ['^' + process.env.VUE_APP_BASE_URL]: ''
        }
      },
      /*'/api':{
        target: 'http://testaiapi.blhltd.com/addons/wechatscanlogin/',//后端域名
        ws: false,
        changeOrigin: true,
        pathRewrite:{ //重新路径
          '^/api':''
        }
      }*/
    }
  },
  configureWebpack: {
    plugins: [
      // 开启 BundleAnalyzerPlugin
      // new BundleAnalyzerPlugin(),
    ],
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    }
  },
})
