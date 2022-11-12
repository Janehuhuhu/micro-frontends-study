/**
 * 处理路由变化
 * - 微应用加载
 *   - 匹配子应用
 *   - 加载子应用
 *   - 渲染子应用
 */

import { getApps } from "."
import { importHTML } from "./import-html"
import { getPrevRoute, getNextRoute } from "./rewrite-router"

export const handleRouter = async () => {
  console.log('=== 微应用加载 ===')

  const apps = getApps()
  // 匹配上一个子应用
  const prevApp = apps.find(item => getPrevRoute().startsWith(item.activeRule))

  // 匹配下一个子应用
  const app = apps.find(item => getNextRoute().startsWith(item.activeRule))

  // 加载前先卸载其他子应用
  prevApp && unmount(prevApp)
  if (!app) return

  // 加载子应用
  const { template, execScripts } = await importHTML(app)
  const container = document.querySelector(app.container)
  container.appendChild(template)

  // 配置环境变量
  window.__POWERED_BY_QIANKUN__ = true
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/'

  // 渲染子应用,获取生命周期，手动渲染
  const appCircle = await execScripts()
  app.bootstrap = appCircle.bootstrap
  app.mount = appCircle.mount
  app.unmount = appCircle.unmount
  bootstrap(app)
  mount(app)

  // 生命周期
  async function bootstrap(app) {
    app.bootstrap && (await app.bootstrap())
  }

  async function mount(app) {
    app.mount && (await app.mount({
      container: document.querySelector(app.container)
    }))
  }

  async function unmount(app) {
    const container = document.querySelector(app.container)
    app.unmount && (await app.unmount({
      container
    }))
    // 删除子应用除app外的其他节点，如script等
    container.innerHTML = ''
  }
}