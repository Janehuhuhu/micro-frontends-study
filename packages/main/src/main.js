import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//qiankun配置
import { registerMicroApps, start } from 'qiankun';
import App from './App.vue'
import router from './router'

Vue.use(ElementUI);


Vue.config.productionTip = false



//子应用列表
let apps = [
  {
    name: 'subapp-vue',
    entry: '//localhost:8080',//子应用的地址，这里演示是本地启动的地址。
    container: '#subapp-container',//子应用的容器节点的选择器（vue一般为app）
    activeRule: '/subapp-vue',//访问子应用的规则，比如：主应用为localhost:8081，那访问该子应用的url应为localhost:8081/subapp-vue2
  },
  {
    name: 'subapp-react',
    entry: '//localhost:3000',
    container: '#subapp-container',
    activeRule: '/subapp-react',
  }
]

//注册子应用
registerMicroApps(apps);

//启动
start();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
