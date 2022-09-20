import Vue from '../entrance';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import 'lib-flexible/flexible.js'
import  '@/plugin/directive'
// 加载全局组件
import './components';

require('./mock/mock');
import axios from '@/http/httpConfig'
Vue.prototype.$http = axios
window.vm = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
