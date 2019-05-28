// pages/course/practice/practice.js
var app = getApp();
import {
  getAcquaintanceTopic
} from '../../../lib/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examId: 0,
    questionId: 0,
    showTitle: true,
    showAnswer: false,
    practice: [],
    practiceIndex: 0 // 练习题索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.login().then(res=>{
      if (options.id) {
        that.setData({
          examId: options.id
        })
      }
      if (options.qid) {
        // TODO 获取相似题列表
        let fields = ['title', 'parse', 'answer2', 'optionA', 'optionB', 'optionC', 'optionD', 'optionE']
        getAcquaintanceTopic({id: options.qid}).then(res=>{
          let practice = [];
          if(res.code == '10000'){
            practice = res.data;
          }
          for(var i in practice){
            for (var k in fields){
              var f = fields[k];
              practice[i][f] = that.renderLatex(practice[i][f]);
              console
            }
          }
          that.setData({
            practice: practice,
            practiceIndex: 0,
            questionId: options.qid
          });
        });
      }
      
    });
    

  },

  changeIndex(e){
    if (this.data.practiceIndex == e.currentTarget.dataset.index) return;
    this.setData({
      practiceIndex: e.currentTarget.dataset.index,
      showTitle: true,
      showAnswer: false
    })
  },

  toggleTitle(e){
    this.setData({showTitle: !this.data.showTitle});
  },

  toggleAnswer(e){
    this.setData({ showAnswer: !this.data.showAnswer });
  },

  back(e) {
    wx.navigateBack({
      delta: 1
    });
  },

  renderLatex(html){
    if (!html || html.length == 0) return html;
    let imgpattern = /\s+src="\/?/g;
    let s = html.replace(imgpattern, ' src="https://teacher.yuangaofen.com/img/');
    imgpattern = /\s+src='\/?/g;
    s = s.replace(imgpattern, " src='https://teacher.yuangaofen.com/img/");
    imgpattern = /url\('\/?/g;
    s = s.replace(imgpattern, ' url(\'https://teacher.yuangaofen.com/img/');
    let pattern = /\\\((.+?)\\\)/g;
    s = s.replace(pattern, '<img src="http://latex.codecogs.com/png.latex?$1" style="vertical-align:middle"/>');
    pattern = /<table.+?>/g;
    s = s.replace(pattern, '<table style="display:inline-block;vertical-align:middle;">');
    return s;
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