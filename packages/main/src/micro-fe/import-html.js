/**
 * 加载子应用资源
 */
import axios from 'axios'
// 加载html
export const importHTML = async (app) => {
  const { entry, container } = app
  const res = await axios.get(entry)
  const template = document.createElement(`div`)
  template.innerHTML = res.data

  // 加载js
  const getExternalScripts = () => {
    // 限定script查找范围，避免找到父节点的script标签
    const scripts = document.querySelectorAll(`${container} script`)
    return Promise.all(Array.from(scripts).map(item => {
      const src = item.getAttribute('src')
      if (src) {
        return axios.get(src.startsWith('http') ? src : entry + src)
      } else {
        return Promise.resolve(item.innerHTML)
      }
    }))
  }
  // 执行js
  const execScripts = async () => {
    console.log('===== 渲染子应用  =====')
    const res = await getExternalScripts()
    // 执行js代码前手动构造一个 commonjs 模块环境
    const module = { exports: {} }
    const exports = module.exports
    res.forEach(item => eval(item?.data || item))
    // 获取生命周期，方便手动调用
    return module.exports
  }

  return { template, execScripts, getExternalScripts }
}