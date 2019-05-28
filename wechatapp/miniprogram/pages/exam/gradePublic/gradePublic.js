// pages/exam/gradePublic/gradePublic.js
import { 
  getIssueStatus, 
  analyzeUpdateExamStatus 
} from '../../../lib/api';
import util from '../../../lib/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLayer:false,
    show:true,
    num:'',
    examName: '元高分',
    examId:1,
    status:7,
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    getIssueStatus({
      examId:this.data.examId
    }).then((res)=>{
      console.log(res)
      this.setData({
        status:res.data
      });
    })
    console.log(options)
    this.setData({
      show: false,
      time: util.getDate(),
      num: options.num || 3,
      isShowLayer: options.isFirst || 3
    })
  },
  closeLayer(){
    this.setData({
      isShowLayer: false
    })
  },
  sendParent(){
    analyzeUpdateExamStatus({
      examId:this.data.examId,
      status:7
    }).then((res)=>{
      console.log(res)
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.examName+'考试成绩',
      path: '/pages/login/guidePage/guidePage'
    }
  }
})