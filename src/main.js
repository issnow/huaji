import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// fastclick
import fastclick from 'fastclick';
// 公共样式
import 'common/stylus/index.styl';
// swiper
import 'swiper/dist/css/swiper.min.css';
// vue-lazyload
import VueLazyload from 'vue-lazyload';

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/logo.jpg')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


/** 
 * main.js需要做的事情
 * 1.定义vm实例
 * 2.引入公共样式
 * 3.安装fastclick,解决移动端300毫秒延迟,
 * 4.引入router
 * 5.引入swiper.css
 * 6.引入vue-lazyload
 * 7.注册store
 */
