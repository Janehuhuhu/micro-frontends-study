/**
 * 最基础的沙箱
 * 基于proxy、with
 */
const ctx = {
  func: variable => {
    console.log(variable)
  },
  foo: 'foo'
}

const func2 = () => {
  console.log('hello world')
}

const ctxProxy = new Proxy(ctx, {
  // with查找路径:如果返回true，则表示从对象中寻找，否则是从全局寻找
  has(target, prop) {
    if (prop in target) {
      return true
    }
    return false
  }
})

// 非常简陋的沙箱
function veryPoorSandbox(code, ctx) {
  with (ctx) { // Add with
    eval(code)
  }
}

// 待执行程序
const code = `
  foo = 'bar'
  func(foo)
  func2()
`

veryPoorSandbox(code, ctxProxy)