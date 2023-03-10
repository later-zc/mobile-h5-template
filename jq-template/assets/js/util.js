/**
 * 为createjs.Tween操作定义元素初始化属性
 * @param {Array<object> | object} args 初始化属性的元素
 */
function initAttr(args) {
  if (args instanceof Array) {
    args.forEach(item => {
      setAttr(item)
    })
  } else {
    setAttr(args)
  }

  function setAttr(item) {
    const {
      el, 
      transform, 
      opacity
    } = item
    if (!el) console.warn('setAttr调用未传入需要设置的元素, 当前对象：', item) 
    if (transform) el.style.transform = transform
    if (opacity) el.style.opacity = opacity
  }
}

/**
 * 延时隐藏页面
 * @param {string} page jq选择器
 * @param {number} delay 延时
 */
function hide(page, delay = 60) {
  setTimeout(() => {
    $(page).css('display', 'none')
  }, delay)
}

/**
 * 显示页面
 * @param {string} page jq选择器
 */
function show(page) {
  $(page).css('display', 'block')
}

/**
 * 消息提示
 * @param {string} text 提示信息
 * @param {string} position 显示位置
 * @param {number} hideAfter 延时隐藏 
 */
function toast(text = '默认信息', position = 'mid-center', hideAfter = 1000) {
  $.toast({
    text,
    position,
    hideAfter,
  })
}

/**
 * document.querySelector的简写方法
 * @param {string} selector css选择器
 * @param {Element} queryElement 查询元素 (默认document)
 * @returns 
 */
function dq(selector, queryElement = document) {
  return queryElement.querySelector(selector)
}

/**
 * document.createElement的简写方法
 * @param {string} tagName 元素名
 * @returns 
 */
function dc(tagName) {
  return document.createElement(tagName)
}
