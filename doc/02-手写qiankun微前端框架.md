## 微前端运行原理
1. 监视路由变化
2. 匹配子应用
3. 加载子应用
4. 渲染子应用

<br>
<br>

### 路由劫持（SPA 监听路由, 如何实现的路由）
- `hash` 路由： `window.onhashchange`，通过事件监听
- `history` 路由
  - `window.onpopstate`: `history.go`、`history.back`、`history.forward`，通过事件监听
  - `pushState`、`replaceState` 需通过函数重写的方式进行劫持
```js
export const rewriteRouter = () => {
  // history路由
  // 监听前进、后退、跳转
  window.addEventListener('popstate', () => {
    console.log('=== 监听前进、后退、跳转 ===')
    handleRouter()
  })

  // pushState 监听
  const rawPushState = window.history.pushState
  window.history.pushState = (...args) => {
    console.log('=== pushState 监听 ===')
    rawPushState.apply(window.history, args)
    handleRouter()
  }

  // replaceState 监听
  const rawReplaceState = window.history.replaceState
  window.history.replaceState = (...args) => {
    console.log('=== replaceState 监听 ===')
    rawReplaceState.apply(window.history, args)
    handleRouter()
  }
}
```

<br>
<br>

### 微应用加载
- 初始执行匹配
- 路由跳转执行匹配
#### 初始执行匹配
- 匹配子应用
  - 获取到当前的路由路径
  - 去子应用注册表中查找

- 加载子应用
  - 配置全局环境变量，__POWERED_BY_QIANKUN
  - 请求获取子应用的资源，HTML、CSS、JS
  - 挂载
    - 客户端渲染需要通过执行 JS 生成内容
    - 浏览器出于安全考虑，innerHTML 中的 script 不会加载和执行
  - 手动加载子应用的 script，执行 script 代码
    - 解析 HTML 获取 script （第三方库 import-html-entry）
      - template：Dom 节点
      - getExternalScripts: 获取所有的 script 标签的代码：[代码,代码]
      - execScripts: 获取并执行所有的 script 脚本代码
    - 执行 script， eval 或 new Function
    - 手动构造一个 CommonJS 模块环境，因为用 window 方式获取时每个子应用变量名称不同
    - 切换子应用时销毁原子应用 unmounted
    - 获取子应用的生命周期钩子，并执行 bootstrap、 mounted

#### umd 打包结果分析
```js
```

#### 图片静态资源加载失败
- 问题
  - 主应用启动 `http://localhost:8081/`，子应用启动 `http://localhost:3000/`，子应用静态资源地址为 `http://localhost:3000/static/xxx`，用主应用启动访问的资源地址为 `http://localhost:8081/static/xxx`，一定会访问失败
- 解决
  - `webpack` 在运行时生成的路径会自动拼接上这个全局变量(如果有的话),即静态资源加载会带上这个变量, 即实际在主应用中访问的子应用资源地址为 `http://localhost:3000/static/xxx`
  - 新增 `public-path.js` 文件，用于修改运行时的 `publicPath`（通过它来指定应用程序中所有资源的基础路径）。什么是运行时的 [publicPath](https://webpack.docschina.org/guides/public-path/#on-the-fly) 
  - 注意点：在子应用入口文件中一定要放在最顶部！！！

```js
__webpack_public_path__ = 'xxxx'
```
```js
// public-path.js
if (window.__POWERED_BY_QIANKUN__) {
  // __INJECTED_PUBLIC_PATH_BY_QIANKUN__ 设置为子应用的 entry
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
// main.js
import 'public-path.js'
```
<br>

#### 页面刷新时页面丢失
页面刷新时，因没有监听到路由变化，所以页面丢失了，需要手动调用
```js
// 启动
export function start() {
  // 路由劫持
  rewriteRouter()
  // 页面刷新时避免页面不渲染
  handleRouter()
}
```
<br>

### CSS 隔离

#### 方式一： shadow dom
-  qiankun 中使用
```js
start({
  strictStyleIsolation: true // 使用shadow dom 解决样式冲突
})
```

-  原理
[详情](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)
```html
<body>
  <p>hello</p>
  <!-- 子应用内容 -->
  <div id="subapp"></div>
  <script>
    const subApp = document.getElementById('subapp')
    const shadow = subApp.attachShadow({mode: 'open'})
    shadow.innerHTML = `
      <p>这是通过 shadow dom 添加的内容</p>
      <style>
        p {color: red}
      </style>
    `
  </script>
</body>
```
<br>

#### 方式二： shadow dom
-  qiankun 中使用
```js
start({
  experimentalStyleIsolation: true // 使用选择器范围来解决样式冲突
})
```
- 原理
给子应用所有样式放在 `data-qiankun="app-vue2"` 空间下
```js
div[data-qiankun="app-vue2"] #app[data-v-xxx] {
  color: red
}
```

<br>

### JS 沙箱
- 快照沙箱
- javascript 沙箱

### 状态管理

### 应用通信



<br>

## 相关材料
- [视频教程-手写qiankun微前端框架](https://www.bilibili.com/video/BV1H34y117fe/?spm_id_from=333.337.search-card.all.click&vd_source=65105152fda76ce4f74f171879bbdcac)
- [手写微前端 simple-qiankun](https://juejin.cn/post/7079379620348313637)
- [从零开始写一个微前端框架-沙箱篇](https://github.com/micro-zoe/micro-app/issues/19)


