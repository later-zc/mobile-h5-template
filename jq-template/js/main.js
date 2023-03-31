var _g = _g || {}
// xx.event = 'ontouchstart' in window
//   ? {start: 'touchstart', move: 'touchmove', end: 'touchend'}
//   : {start: 'click', move: 'mousemove', end: 'mouseup'}
var _m = _m || {}

;(function($) {
  var defaults = {
    moveIn: 'moveIn',
    moveOut: 'moveOut',
    pOn: 'page-on',
    fadeIn: 'fadeIn',
    fadeOut: 'fadeOut',
    cb: null
  }
  $.fn.moveIn = function(opts) {
    opts = $.extend({}, defaults, opts)
    this.addClass(opts.moveIn).show()
    this.one('webkitAnimationEnd', () => {
      this.removeClass(opts.moveIn).addClass(opts.pOn)
      opts.cb&&opts.cb()
    })
    return this
  }
  $.fn.moveOut = function(opts) {
    opts = $.extend({}, defaults, opts)
    this.addClass(opts.moveOut).show()
    this.one('webkitAnimationEnd', () => {
      this.removeClass(`${opts.moveOut} ${opts.pOn}`).hide()
      opts.cb&&opts.cb()
    })
    return this
  }
  $.fn.fadeOut = function(opts) {
    opts = $.extend({}, defaults, opts)
    this.addClass(opts.fadeOut).show()
    this.one('webkitAnimationEnd', () => {
      this.removeClass(`${opts.fadeOut} ${opts.pOn}`).hide()
      opts.cb && opts.cb()
    })
    return this
  }
  $.fn.fadeIn = function(opts) {
    opts = $.extend({}, defaults, opts)
    this.addClass(opts.fadeIn).show()
    this.one('webkitAnimationEnd', () => {
      this.removeClass(`${opts.fadeIn} ${opts.pOn}`).hide()
      opts.cb && opts.cb()
    })
    return this
  }
})(jQuery)

_m.hint = function(t) {
  if (_m.hint.lastT == t) return
  _m.hint.lastT = t
  var maskEl = $(`<div class='mask'><div class='hint'>${t}</div></div>`)
  maskEl.appendTo('body')
  maskEl.moveIn({
    cb() {
      setTimeout(() => {
        maskEl.fadeOut({
          cb() {
            maskEl.remove()
          }
        })
        _m.hint.lastT = null
      }, 2000)
    }
  })
}

_g.page = {
  now: null,
  last: null,
  _z: 2, // 页面层级z-index
  _timer: null,
  _defaults: {
    isMove: false,
    pMoveIn: 'page-move-in',
    classMoveOut: '',
    pOn: 'page-on',
    cb: null
  },
  err(e) {
    try {
      throw new Error(e)
    } catch(err) {
      console.log(err.stack)
    }
  },
  to(pid, opts = {}) {
    var that = this
    opts = $.extend({}, this._defaults, opts)
    console.log('pid: ', pid)
    if (pid == this.now) return this.err('跳转失败, 跳转的是当前页面')
    this.last = this.now
    this.now = pid
    this._z++
    var $nowPage = $(this.now)
    var $lastPage = this.last&&$(this.last) || null
    console.log('$lastPage: ', $lastPage)
    $nowPage.css('z-index', this._z)
    // 初始化
    this.reset($nowPage)
    clearTimeout(this._timer)

    if (opts.isMove) {
      $nowPage.addClass(opts.pMoveIn).show()
      $nowPage.one('webkitAnimationEnd', () => {
        $nowPage.addClass(opts.pOn)
        $nowPage.removeClass(opts.pMoveIn)
        $lastPage&&this.reset($lastPage)
        opts.cb&&opts.cb()
      })
    } else {
      $nowPage.show()
      this._timer = setTimeout(() => {
        $nowPage.addClass(opts.pOn)
        $lastPage&&this.reset($lastPage)
        opts.cb&&opts.cb()
      }, 6)
    }

    $lastPage&&opts.classMoveOut&&$lastPage.addClass(opts.classMoveOut)
  },
  reset($page) {
    // 重置并添加页面最初的class，data-page-class="page class1 class2"
    var oPage = $page[0]
    var init = 'page'
    if (oPage && oPage.dataset.pageClass) {
      init = oPage.dataset.pageClass
    }
    $page.hide().removeClass().addClass(init)
    $page.off('webkitAnimationEnd')
  }
}

;(function() {
  /**
   * @constructor Imgloader 图片加载类
   * @property {string} basePath 基础路径
   * @property {string} crossOrigin 源
   * @property {Array<string>} loadType 自定义加载类型
   * @property {number} time 单张图片最大加载时间
   * @property {function} onProgress 加载进度
   * @property {function} onComplete 加载完成
   */
  function ImgLoader() {
    this.basePath = ''
    this.crossOrigin = ''
    this.loadType = ['_src']
    this.time = 5000
    this.onProgress = function(){}
    this.onComplete = function(){}
  }
  ImgLoader.prototype.load = function() {
    var loadItem = this._createQueue(this.loadType)
    console.warn('loadItem: ', loadItem)
    var 
      total = loadItem.length,
      loaded = 0,
      isOverTime = false,
      timer
    if (total == 0) {
      this.onComplete()
    } else {
      timer = setTimeout(() => {
        isOverTime = true
        this.onComplete()
      }, this.time * total)
      for (var i = 0; i < total; i++) {
        this._loadOnce(loadItem[i], loading)
      }
    }
    function loading() {
      loaded++
      var num = Math.floor((loaded / total) * 100)
      this.onProgress(num)
      if (num == 100 && !isOverTime) {
        clearTimeout(timer)
        this.onComplete()
      }
    }
  }
  ImgLoader.prototype._createQueue = function(loadType) {
    var loadItem = []
    for (var i = 0; i < loadType.length; i++) {
      var type = loadType[i]
      if (/.jpg|.png|.gif/i.test(type)) {
        var img = new Image()
        img.crossOrigin = this.crossOrigin || null
        loadItem.push({
          tag: img,
          src: this.basePath + type
        })
      } else {
        var $img = $(`img[${type}]`)
        $img.each((i, el) => {
          el.crossOrigin = this.crossOrigin || null
          loadItem.push({
            tag: el,
            src: this.basePath + $(el).attr(type)
          })
        })
      }
    }
    return loadItem
  }
  ImgLoader.prototype._loadOnce = function({tag, src}, cb) {
    tag.src = src
    if (tag.complete) return cb.call(this)
    tag.onload = () => {
      tag.onload = null
      cb.call(this)
    }
    tag.onerror = () => {
      tag.onerror = null
      cb.call(this)
    }
  }
  _g.ImgLoader = ImgLoader
})()


_m.init = function() {
  init().then(res => {
    console.warn('res: ', res)
    if (res.status == 1) {
      _m.initData = res
      $('#page-load').fadeOut()
      _m.hint('hello world')
      _g.page.to('#page-hp', {
        cb() {
          $('.start').one('webkitTransitionEnd', ()=> {
            console.log('start动画执行完成')

            $('.start').addClass('start_ani')
          })  
        }
      })
    } else if (res.status == -5) {
      _m.hint('活动已结束，感谢您的关注!')
    }
  })
}

_g.main = function() {
  console.log('加载完毕---------')
  console.log('进入页面---------')
  // var imgLoader2 = new xx.ImgLoader()
  // imgLoader2.basePath = xx.cdn
  // imgLoader2.loadType = ['_src2']
  // imgLoader2.load()

  _m.init()
  $('.rule-btn').on('click', () => {
    console.log('first')
  })
}