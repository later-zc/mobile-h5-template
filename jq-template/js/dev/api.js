$.mockjax({
  url: 'Common/init.aspx',
  response: function (settings) {
    this.responseText = {
      status: 1,
      fund: 1, //用户可抽奖次数
      first: 0, //用户分享情况{已分享:1；未分享：0；默认未分享}
    }
  },
})
$.mockjax({
  url: 'Common/form2.aspx',
  response: function (settings) {
    this.responseText = {
      status: 1,
    }
  },
})
$.mockjax({
  url: 'Common/form3.aspx',
  response: function (settings) {
    this.responseText = {
      status: 1,
    }
  },
})
$.mockjax({
  url: 'Common/form.aspx',
  responseText: {
    status: -5,
    list: [{ name: '百货1000减60优惠券' }],
  },
})
