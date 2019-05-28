// pages/course/cover.js
var app = getApp();
import {
  getCourseExamInfo,
  courseOauth
} from '../../../lib/api';
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    examId: '',
    exam: { examSubject: "语文", examName: '八年级（2014级）期末统考', className: "2014级1班", id: 181, examTime: '2019-03-10' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({ examId: options.id });
      app.login().then(res => {
        getCourseExamInfo({ id: options.id }).then(res => {
          this.setData({ exam: res.data });
        });
      });
    }
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

  },

  back: function(e){
    wx.navigateBack({ delta: 1});
  },

  next: function(e){
    wx.redirectTo({
      url: '/pages/course/question/question?id=' + this.data.examId,
    })
  },

  scanCode: function(e){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: (res)=> {
        console.log(res.path);
        if(res.path) {
          let code = res.path.split("scene=")[1].replace('dengchao','')
          console.log(code);
          courseOauth({
            examId: this.data.examId,
            code: code
          }).then(res=>{
            console.log(res)
          })
        }
        // OAuth({
        //   code:'',
        //   examId:this.data.examId
        // })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})