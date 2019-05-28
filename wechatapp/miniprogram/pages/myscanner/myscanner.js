// pages/myscanner/myscanner.js
import { getScanList, removeScaner } from '../../lib/api';
Page({
  data: {
    schoolList: [],
    userList: [],
    schoolName:'',
    isSchool:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.schoolName){
      // if(options.schoolName == '无归属学校'){

      // }else{
        this.setData({
          schoolName: options.schoolName
        })
      // }
    }
    this.getScanlists();
  },
  getScanlists() {
    getScanList({}).then((res) => {
      console.log(res);
      if (res.code == 10000) {
        if(res.data.length == 0){
          wx.showToast({
            icon:'none',
            title: '没有扫描仪！',
          })
          return
        }
        var arr1 = [];
        var arr2 = [];
        for(let i =0;i<res.data.length;i++){
          if(res.data[i].type == 0){
            if (res.data[i].userStatus!=2){
              arr1.push(res.data[i]);
            }
          }else{
            if (res.data[i].userStatus != 2) {
              arr2.push(res.data[i]);
            }
          }
        }
        this.setData({
          userList:arr1,
          schoolList:arr2
        })
      }
    })
  },
  removeScan(e){
    var params = { mac: e.currentTarget.dataset.url};
    removeScaner(params).then((res)=>{
      console.log(res);
      if(res.code == 10000){
        wx.showToast({
          title: '移除成功',
        })
        this.getScanlists()
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