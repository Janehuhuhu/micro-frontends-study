/**
 * 手写微前端框架
 */
import { rewriteRouter } from "./rewrite-router"
import { handleRouter } from './handle-router'

let _apps = []

// 获取子应用信息
export function getApps() {
  return _apps
}

// 注册子应用
export function registerMicroApps(apps) {
  console.log('=== 注册子应用 ===')
  _apps = apps
}

// 启动
export function start() {
  console.log('=== 启动 ===')
  // 路由劫持
  rewriteRouter()
  // 页面刷新时避免页面不渲染
  handleRouter()
}