//配置文件夹别名
module.exports = {
  baseUrl: './',
  configureWebpack: {
    resolve: {
      alias: {
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'api': '@/api',
        'store': '@/store',
        'views': '@/views',
      }
    }
  }
}