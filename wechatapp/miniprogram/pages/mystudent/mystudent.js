// pages/parent/parent.js
import { getMystudentList} from '../../lib/api.js'
Page({
  data: {
    index:0,
    classList:[],
    studentList:[]
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var classList = this.data.classList;
    var id = classList[e.detail.value].classId;
    this.getStudent(id);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.classList){
      var classList = JSON.parse(options.classList)
      console.log('list',classList)
      this.setData({
        classList:classList
      })
      if(classList.length > 0){
        var id = classList[0].classId;
        this.getStudent(id);
      }
    }
  },
  /*获取班级学生列表*/
  getStudent(id){
    var params = {
      classId:id
    }
    getMystudentList(params).then((res)=>{
      if(res.code == 10000){
        this.setData({
          studentList:res.data
        })
      }
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