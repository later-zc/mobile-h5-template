;(function () {
  function isMobile() {
    const reg =
      /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i
    return reg.test(navigator.userAgent.toLowerCase())
  }

  function addStyleNode(str) {
    const styleNode = document.createElement('style')
    styleNode.type = 'text/css'
    styleNode.innerHTML = str
    document.getElementsByTagName('head')[0].appendChild(styleNode)
    return styleNode
  }

  // css元素尺寸 = 设计稿元素尺寸 rem
  const 
    psw = 750, // 设计稿尺寸
    maxW = window.screen.height / 1.8 // pc端显示宽度最大尺寸
  /**
   * orientationchange 当设备的方向发生变化时会触发该事件
   * 此事件已弃用。改为监听ScreenOrientation.onchange事件
   */
  const change = 'orientationchange' in window ? 'orientationchange' : 'resize'
  console.warn('change: ', change)
  console.warn("screen.orientation.angle: ", screen.orientation.angle)
  if (
    screen.orientation.angle == 0 || 
    window.orientation == 0
    ) 
    console.warn('竖屏')
  else 
    console.warn('横屏')

  function updateDocFontSize() {
    var deviceWidth = document.documentElement.clientWidth
    console.warn('deviceWidth: ', deviceWidth)
    if (deviceWidth < 320) deviceWidth = 320

    if (!isMobile()) if (deviceWidth >= maxW) deviceWidth = maxW
    console.warn('更新后 deviceWidth: ', deviceWidth)
    document.documentElement.style.fontSize = deviceWidth / psw + 'px'
  }

  let timer = null
  window.addEventListener(change, () => {
    clearTimeout(timer)
    timer = setTimeout(updateDocFontSize, 200)
  })

  updateDocFontSize()

  if (!isMobile()) {
    addStyleNode(`.wrapper{max-width:${maxW}px}`)
  }
})()
