## 微前端 qiankun 的使用
### 要点
1. 创建主、子应用工程
2. 主应用安装 qiankun
  ```js
  yarn add qiankun
  ```
3. 主应用配置：注册子应用并启动微前端服务
  ```js
  import Vue from 'vue'
  import App from './App.vue'

  Vue.config.productionTip = false


  //qiankun配置
  import { registerMicroApps, start } from 'qiankun';

  //子应用列表
  let apps = [
    // 当匹配到 activeRule 的时候，请求获取 entry 资源，渲染到 主应用的container 中
    {
      name:'subapp',
      entry:'//localhost:8080',//子应用的地址，这里演示是本地启动的地址。
      container:'#app',//子应用的容器节点的选择器（vue一般为app）
      activeRule:'/subapp',//访问子应用的规则，比如：主应用为localhost:8081，那访问该子应用的url应为localhost:8081/subapp
    }
  ]

  //注册子应用
  registerMicroApps(apps);

  //启动
  start();

  new Vue({
    render: h => h(App),
  }).$mount('#app')
  ```
4. 子应用配置 `public-path.js` 和 `main.js`, 并暴露生命周期钩子
  - 导出三个必要的生命周期函数
    - bootstrap: 渲染之前
    - mount: 渲染函数
    - unmount: 卸载函数
  - 生命周期函数必须返回 `promise`
  - `container.querySelector('#app')`: 先圈定主应用的范围 `container`，然后在这个范围内找到子应用挂载节点
    
  ```js
  // public-path.js
  if (window.__POWERED_BY_QIANKUN__) {
      __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
  // main.js
  import Vue from 'vue'
  import App from './App.vue'

  Vue.config.productionTip = false

  let instance = null;
  function render(props = {}) {
    const { container } = props;

    instance = new Vue({
      render: (h) => h(App),
    }).$mount(container ? container.querySelector('#app') : '#app');
  }

  // 独立运行时
  if (!window.__POWERED_BY_QIANKUN__) {
    render();
  }

  export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
  }
  export async function mount(props) {
    console.log('[vue] props from main framework', props);
    render(props);
  }
  // 一般切换应用的时候用到
  export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
  }
  ```
5. 子应用打包配置
  - 允许 `CORS` 跨域，主应用访问子应用地址
  - 子应用必须打包成一个库格式，且格式必须为 `umd`,因为主应用要加载子应用的资源，如 html、js等，如果主应用要获取子应用资源，模块必须格式需兼容
  - `jsonpFunction` : 如果通过 `jsonp` 方式加载子应用资源，对应的 `jsonp` 的回调函数名称

  ```js
  // vue.config.js
  const { name } = require('./package');
  module.exports = {
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    configureWebpack: {
      output: {
        library: `${name}-[name]`,
        libraryTarget: 'umd', // 把微应用打包成 umd 库格式
        // jsonpFunction: `webpackJsonp_${name}`,
      },
    },
  };
  ```
<br>

### 材料
- [微前端qiankun（vue）使用教程](https://juejin.cn/post/7007714510186217508)