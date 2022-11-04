## 微前端运行原理
1. 监视路由变化
2. 匹配子应用
3. 加载子应用
4. 渲染子应用

### SPA 监听路由（如何实现的路由）
- hash 路由： window.onhashchange，通过事件监听
- history路由
  - window.onpopstate: history.go、history.back、history.forward，通过事件监听
  - pushState、replaceState 需通过函数重写的方式进行劫持

### 初始执行匹配
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

### umd 打包结果分析
```js
```