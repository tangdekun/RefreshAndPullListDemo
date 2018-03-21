//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    words: ["A", "B", "C", "D"],
    windowHeight: 0,//获取屏幕高度
    refreshHeight: 0,//获取高度
    refreshing: false,//是否在刷新中
    loading: false,
    refreshAnimation: {}, //加载更多旋转动画数据
    loadAnimation: {},
    clientY: 0,//触摸时Y轴坐标
  },
  onLoad: function () {
    var _this = this;
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowHeight: res.windowHeight
        })
        console.log("屏幕高度: " + res.windowHeight)
      }
    })
    // //获取words
    // wx.request({
    //   url: 'http://api.avatardata.cn/ChengYu/Search?key=77f072d28eb141c8b6dda145ca364b92&keyWord=好',
    //   complete: function (res) {
    //     if (res.data.reason == 'Succes') {
    //       _this.setData({
    //         words: res.data.result
    //       })
    //     }
    //   }
    // })
    this.setData({
      words: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    })
  },
  scroll: function () {
    console.log("滑动了...")
  },
  lower: function () {
    var start = 0;
    start += 1;
    console.log("加载了...")
    var _this = this;

    // wx.request({
    //   url: 'http://api.avatardata.cn/ChengYu/Search',
    //   data: {
    //     key: '77f072d28eb141c8b6dda145ca364b92', keyWord: '好', page: start
    //   },
    //   complete: function (res) {
    //     if (res.data.reason == 'Succes') {
    //       var words = _this.data.words.concat(res.data.result);
    //       _this.setData({
    //         words: words
    //       })
    //     }
    //   }
    // })
    if (this.data.loading) return;
    this.setData({ loading: true });
    updateLoadIcon.call(this);
    var words = _this.data.words.concat(["L", "M", "N", "O", "P", "Q", "R", "S", "T"]);

    setTimeout(function () {
      _this.setData({
        words: words
      })
    }, 2000)
    setTimeout(function () {
      _this.setData({
        loading: false
      })
    }, 2500)
  },
  upper: function () {
    console.log("下拉了....")
    //获取用户Y轴下拉的位移

    if (this.data.refreshing) return;
    this.setData({ refreshing: true });
    updateRefreshIcon.call(this);
    var _this = this;
    var i = Math.random() //获得0-1的随机数
    i = Math.ceil(i * 10) //乘以10并向上去整
    var refrewords = ['龙', '一', '万', '千', '浩', '金', '得', '而', '可', '人', '龙', '一', '万', '千', '浩', '金', '得', '而', '可', '人'];
    var words = refrewords.concat(refrewords[i]);
    setTimeout(function () {
      _this.setData({
        words: words
      })
    }, 2000)
    setTimeout(function () {
      _this.setData({
        refreshing: false
      })
    }, 2500)


    // var word = words[i];
    //   wx.request({
    //     url: 'http://api.avatardata.cn/ChengYu/Search?key=77f072d28eb141c8b6dda145ca364b92&keyWord=' + word,

    //     complete: function (res) {
    //       if (res.data.reason == 'Succes') {
    //         setTimeout(function () {
    //           _this.setData({
    //             words: res.data.result
    //           })
    //         }, 2000)
    //       }
    //       setTimeout(function () {
    //         _this.setData({
    //           refreshing: false
    //         })
    //       }, 2500)
    //     }
    //   })
  },
  start: function (e) {
    var startPoint = e.touches[0]
    var clientY = startPoint.clientY;
    this.setData({
      clientY: clientY,
      refreshHeight: 0
    })
  },
  end: function (e) {
    var endPoint = e.changedTouches[0]
    var y = (endPoint.clientY - this.data.clientY) * 0.6;
    if (y > 50) {
      y = 50;
    }
    this.setData({
      refreshHeight: y
    })
  },

  move: function (e) {
    console.log("下拉滑动了...")
  }
})

/**
 * 旋转下拉图标
 */
function updateRefreshIcon() {
  var deg = 0;
  var _this = this;
  console.log('旋转开始了.....')
  var animation = wx.createAnimation({
    duration: 1000
  });
  var timer = setInterval(function () {
    if (!_this.data.refreshing)
      clearInterval(timer);
    animation.rotateZ(180).step();//在Z轴旋转一个deg角度
    // deg += 360;
    _this.setData({
      refreshAnimation: animation.export()
    })
  }, 1000);
}
/**
 * 旋转上拉加载图标
 */
function updateLoadIcon() {
  var deg = 0;
  var _this = this;
  console.log('上拉旋转开始了.....')
 getOpenId();
  var animation = wx.createAnimation({
    duration: 2000
  });
  var loadtimer = setInterval(function () {
    if (!_this.data.loading)
      clearInterval(loadtimer);
    animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
    deg += 360;
    console.log('执行动画开始')
    _this.setData({
      loadAnimation: animation.export()
    })
  }, 1000);
}

function getOpenId() {
  var that = this;
  wx.login({
    success: function (res) {
      if (res.code) {
        //获取openId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            //小程序唯一标识
            appid: '',
            //小程序的 app secret
            secret: '',
            grant_type: 'authorization_code',
            js_code: res.code
          },
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success: function (openIdRes) {
            console.info("登录成功返回的openId：" + openIdRes.data.openid);
            // 判断openId是否获取成功
            if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
              // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
              wx.getUserInfo({
                success: function (data) {
                  // 自定义操作
                  // 绑定数据，渲染页面
                  that.setData({

                  });
                },
                fail: function (failData) {
                  console.info("用户拒绝授权");
                }
              });
            } else {
              console.info("获取用户openId失败");
            }
          },
          fail: function (error) {
            console.info("获取用户openId失败");
            console.info(error);
          }
        })
      }
    }
  });
}