// pages/main/me/me.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    words: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    windowHeight: 0,//获取屏幕高度
    windowWidth: 0,//获取屏幕宽度
    refreshHeight: 0,//获取高度
    refreshing: false,//是否在刷新中
    refreshAnimation: {}, //加载更多旋转动画数据
    clientY: 0,//触摸时Y轴坐标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
        console.log("屏幕高度: " + res.windowHeight)
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})