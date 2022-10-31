let baseURL = ''
if (process.env.NODE_ENV === 'production') {
    //根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境
    if (process.env.VUE_APP_BASE_API === 'production') {
        //production 生产环境
        baseURL = 'http://testaiapi.blhltd.com'
    } else {
        //test 测试环境
        baseURL = ''
    }
} else {
    //development 开发环境
    baseURL = 'http://localhost:8080/'
}
export default baseURL
