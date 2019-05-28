// pages/myparent/myparent.js
import { getUnionStudentList, updateUnionParent } from '../../lib/api';
Page({
  data: {
    array: ['初一1班（60）人', '初一1班（60）人', '初一1班（60）人', '初一1班（60）人'],
    index: 0,
    tabactive:2,
    avator:3,
    studentList:50,
    useractive:false,
    propmodel:false,
    classList:[],
    unUnion:[], //未绑定
    union:[],   //已绑定
    parentInfo:[], //绑定的家长
    parentId:[] ,   //家长id数组
    student_id:0,  //学生id
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
  changeTab(e){
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      tabactive:tab*1
    })
  },
  actions(e){
    var index = e.currentTarget.dataset.index;
    var union = this.data.union;
    this.setData({
      propmodel:true,
      student_id: union[index].student_id,
      parentInfo:union[index].parentInfo
    })
  },
  /*点击选中 解除 操作*/
  unionHandle(e){
    var id = e.currentTarget.dataset.id;
    var parentId = this.data.parentId;
    if(parentId.indexOf(id) == -1){
      parentId.push(id);
    }else{
      parentId.splice(parentId.indexOf(id),1);
    }
    this.setData({
      parentId:parentId
    })
  },
  /*点击确定 解除操作*/
  btnHandle(){
    var classList = this.data.classList;
    var index = this.data.index;
    var id = classList[index].classId;
    var parentArr = this.data.parentId;
    var student_id = this.data.student_id;
    var that = this;
    function updateUnion(n){
      var params = {
        studentId: student_id,
        parentId: parentArr[n]
      }
      updateUnionParent(params).then((res) => {
        if (res.code == 10000) {
          if (n < parentArr.length-1){
            updateUnion(n + 1);
          }else{
            wx.showToast({
              icon: 'success',
              title: res.msg,
            })
            that.getStudentList(id);
            that.setData({
              propmodel: false
            })
          }
        }else{
          wx.showToast({
            icon: 'none',
            title: res.msg,
          })
        }
      })
    }
    updateUnion(0);
  },
  closeModel(){
    this.setData({
      propmodel: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.classList) {
      var classList = JSON.parse(options.classList)
      this.setData({
        classList: classList
      })
      if (classList.length > 0) {
        var id = classList[0].classId;
        this.getStudentList(id);
      }
    }
  },
  getStudentList(id){
    if(!id){
      console.log('没有id') 
      return
    };
    var params = {classId:id};
    getUnionStudentList(params).then((res)=>{
      if(res.code == 10000){
        var oldUnion = res.data.union;
        for (let i = 0; i < oldUnion.length;i++){
          oldUnion.parentInfo = JSON.parse(oldUnion.parentInfo);
        }
        this.setData({
          union: oldUnion,
          unUnion:res.data.unUnion
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