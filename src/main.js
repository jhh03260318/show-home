import Vue from 'vue'
import App from './App'
import router from './router/route-index'

//引入全局css文件
import './assets/css/reset.css';

//引入全局公共组件
import commonComponents from './components/common-index.js';
//因为不确定有多少个公共组件，所以需要将引进来的公共组件遍历并使用
for (let item in commonComponents) {
  Vue.component(item, commonComponents[i]);
}

//引入全局过滤器
import filters from './filters/filter-index.js';
//不确定有多少个全局过滤器，所以需要将引入的全局过滤器遍历并使用
for(let item in filters){
  Vue.filter(item,filters[item]);
}

//引入状态管理vuex
import store from './store/index.js';

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 配置一个全局图片的线上图片路径
Vue.prototype.$prefiximgUrl = "http://localhost:3000/"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
