// pages/school/school.js
import { bindInfos, getSchoolLists } from '../../lib/api.js'
Page({
  data: {
    clearStatus:false,
    inputValue:'',
    schoolList:[],
    schoolId:'',
    newInput:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      this.setData({
        inputValue: options.name && options.name != 'null'? options.name:'无归属学校'
      })
  },
  /*input 获取焦点*/
  inputFocus(e){
    var val = e.detail.value;
    if(val){
      this.setData({
        clearStatus: true
      })
    }
  },
  /*input输入触发*/
  inputChange(e){
    var val = e.detail.value;
    if(val == ''){
      var list = [{ school_name: '无归属学校',id:-1}];
      this.setData({
        schoolList: list
      })
      return
    }
    getSchoolLists({ school:val}).then((res)=>{
      if(res.code == 10000){
        var list = res.data;
        var obj = {
          school_name:'无归属学校',
          id:-1
        }
        list.push(obj);
        this.setData({
          schoolList:list
        })
      }
    })
    this.setData({
      clearStatus:true,
      newInput:val
    })
  },
  /*清空输入框*/
  removeInput(){
    this.setData({
      inputValue:''
    })
  },
  /*点击学校选中*/
  handleClick(e){
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    this.setData({
      inputValue:name,
      schoolId:id,
      schoolList:[],
      clearStatus:false
    })
  },
  bindHandle(){
    if(this.data.schoolId){
      if (this.data.inputValue == this.data.newInput){
        wx.navigateBack({
          delta: 1
        })
        return
      }
      var params = {
        schoolId: this.data.schoolId
      };
      bindInfos(params).then((res) => {
        if (res.code == 10000) {
          wx.showToast({
            title: res.data,
            duration: 2000,
            success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        }
      })
    }else{
      wx.navigateBack({
        delta: 1
      })
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

  }
})