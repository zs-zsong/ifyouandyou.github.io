// pages/wrongTopic/studentReport/studentReport.js
import {
  getStudentInfor,
  updateStudentName
} from '../../../lib/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examId: '',
    studentId:'',
    studentInfo:'',
    studentDeac:'', // 学生概况
    disabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(Object.keys(options).length)
    let info = JSON.parse(options.info);
    if (Object.keys(options).length>0){
      this.setData({
        examId: options.examId,
        studentId: info.id,
        studentInfo: info
      })
    }
    

    this.getStudentInfo();
  },
  modify(ev){
    console.log(ev)
    updateStudentName({
      name:ev.detail.value,
      id: this.data.studentId,
      examId: this.data.examId
    }).then(res=>{
      this.data.studentInfo.studentName= ev.detail.value
      this.setData({
        disabled: true,
        studentInfo: this.data.studentInfo
      })
      console.log(res)
    })
  },
  changeName(){
    this.setData({
      disabled:false
    })
  },
  getStudentInfo(){
    getStudentInfor({
      examId:this.data.examId,
      studentId:this.data.studentId
    }).then(res=>{
      console.log(res)
      this.setData({
       
        studentDeac:res.data
      })
    })
  },

  checkBook(){
    wx.navigateTo({
      url: `/pages/wrongTopic/answerList/answerList?examId=${this.data.examId}&info=${JSON.stringify(this.data.studentInfo)}`
    })
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