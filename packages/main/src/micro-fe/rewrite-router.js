/**
 * 路由劫持
 * - hash 路由： 
 *   - window.onhashchange，通过事件监听
 * - history路由：
 *   - window.onpopstate: history.go、history.back、history.forward，通过事件监听
 *   - pushState、replaceState 需通过函数重写的方式进行劫持
 */
import { handleRouter } from './handle-router'

let prevRoute = ''
let nextRoute = window.location.pathname

export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

export const rewriteRouter = () => {
  // history路由
  // 监听前进、后退、跳转
  window.addEventListener('popstate', () => {
    console.log('=== 监听前进、后退、跳转 ===')
    // popstate 触发的时候，路由已经完成导航了
    prevRoute = nextRoute
    nextRoute = window.location.pathname
    handleRouter()
  })

  // pushState 监听
  const rawPushState = window.history.pushState
  window.history.pushState = (...args) => {
    console.log('=== pushState 监听 ===')
    prevRoute = window.location.pathname
    rawPushState.apply(window.history, args)
    nextRoute = window.location.pathname
    handleRouter()
  }

  // replaceState 监听
  const rawReplaceState = window.history.replaceState
  window.history.replaceState = (...args) => {
    console.log('=== replaceState 监听 ===')
    prevRoute = window.location.pathname
    rawReplaceState.apply(window.history, args)
    nextRoute = window.location.pathname
    handleRouter()
  }
}