
const app = getApp();
Page({
  onMyEvent(el){ //footer传入事件
    this.setData({
      type: el.detail.type
    })
    // if (el.detail.type == 2){
    //   this.selectComponent('#examManage').huoList();
    // }
  },
  /**
   * 页面的初始数据
   */
  data: {
    type:2   // 1 成绩分析 2 创建考试  3 考试管理
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // setTimeout(()=>{
    //   console.log("刷新")
    //   if (getCurrentPages().length != 0) {
    //     //刷新当前页面的数据
    //     getCurrentPages()[getCurrentPages().length - 1].onLoad()
    //   }
    // },6000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.userInfo)
    // this._drowChartColumn();
  },
  onMyManage(e) {
    console.log(2222222222)
    this.setData({
      type: e.detail.type
    })
    this.selectComponent('#footer').jumpOne();
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

  },
  onPullDownRefresh() {
    this.selectComponent('#examManage').huoList();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 800)
  },
})