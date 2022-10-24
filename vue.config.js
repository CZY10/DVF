const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const port = process.env.port || process.env.npm_config_port || 8080

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',//process.env.NODE_ENV === 'development' ? '/' : './',    //'./',/*development,production*/
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer:{
    host:'localhost',
    port:port,
    open:true,
    proxy:{
      '/api':{
        target: 'http://testaiapi.blhltd.com/addons/wechatscanlogin/',//后端域名
        // ws: true,
        changeOrigin: true,
        pathRewrite:{ //重新路径
          '^/api':''
        }
      }
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
