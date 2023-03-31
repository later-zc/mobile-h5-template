;(function () {
  window._wx = {
    baseLink: document.URL.substring(0, document.URL.lastIndexOf('/') + 1),
    config: {
      debug: false, //是否开启调试模式
      jsApiList: [
        'getLocation', // 获取地理位置接口
        'openLocation', // 使用微信内置地图查看位置接口
        'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
        'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        'hideMenuItems', // 批量隐藏功能按钮接口
        'startRecord', // 开始录音接口
        'stopRecord', // 停止录音接口
        'onVoiceRecordEnd', // 监听录音自动停止接口
        'playVoice', // 播放语音接口
        'pauseVoice', // 暂停播放接口
        'stopVoice', // 停止播放接口
        'onVoicePlayEnd', // 监听语音播放完毕接口
        'uploadVoice', // 上传语音接口
        'downloadVoice', // 下载语音接口
        'translateVoice', // 识别音频并返回识别结果接口
        'hideAllNonBaseMenuItem', // 隐藏所有非基础按钮接口
      ],
      hideMenuItems: {
        // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp'],
      },
      IsHideMenu: false, //隐藏高级功能菜单
    },
    share1: {}, //分享朋友
    share2: {}, //分享朋友圈
  }
  _wx.init = function (callbacks) {
    $.ajax({
      url:
        // ('https:' == document.location.protocol ? 'https://' : 'http://') +
        // 'lzsmedia.com/csw/cxh/joy_dome/joy.aspx',
        `${location.protocol}//lzsmedia.com/csw/cxh/joy_dome/joy.aspx`,
      type: 'POST',
      data: {
        urls: location.href,
      },
      dataType: 'json',
      success: function (msg) {
        if (msg.status == 1) {
          setting(msg)
          if (callbacks) callbacks()
          // cb&&cb()
        }
      },
    })
  }
  // 步骤一：绑定域名
  // 步骤二：引入JS文件
  // https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

  function setting(msg) {
    // 步骤三：通过config接口注入权限验证配置
    wx.config({
      debug: _wx.config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
      appId: msg.appId, // 必填，公众号的唯一标识
      timestamp: msg.timestamp, // 必填，生成签名的时间戳
      nonceStr: msg.nonceStr, // 必填，生成签名的随机串
      signature: msg.signature, // 必填，签名，见附录1
      jsApiList: _wx.config.jsApiList, // 必填，需要使用的JS接口列表
    })
    // 步骤四：通过ready接口处理成功验证
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.hideMenuItems(_wx.config.hideMenuItems)
      //分享给朋友
      wx.onMenuShareAppMessage(_wx.share1)
      //分享到朋友圈
      wx.onMenuShareTimeline(_wx.share2)
      if (_wx.config.IsHideMenu) {
        wx.hideAllNonBaseMenuItem()
      }
    })
    // 步骤五：通过error接口处理失败验证
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    wx.error(function (res) {})
  }
})()
