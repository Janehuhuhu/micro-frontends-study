/**
 * 加载子应用资源
 */
import axios from 'axios'
// 加载html
export const importHTML = async (url) => {
  const res = await axios.get(url)
  const template = document.createElement('div')
  template.style.height = '100%'
  template.innerHTML = res.data
  // 加载js
  const getExternalScripts = () => {
    const scripts = document.querySelectorAll('script')
    return Promise.all(Array.from(scripts).map(item => {
      const src = item.getAttribute('src')
      if (src) {
        console.log(9999, src.startsWith('http') ? src : url + src)
        return axios.get(src.startsWith('http') ? src : url + src)
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
    res.forEach(item => eval(item.data || item))
    // 获取生命周期，方便手动调用
    return module.exports
  }

  return { template, execScripts, getExternalScripts }
}