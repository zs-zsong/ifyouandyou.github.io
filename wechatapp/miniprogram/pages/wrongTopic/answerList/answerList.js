// pages/wrongTopic/answerList.js
var WxParse = require('./wxParse/wxParse.js');
import {
  studentMisTakeInfo,
  questionInfo
} from '../../../lib/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'',
    arr:[1,2],
    showCon:false,
    studentId:185,
    examId:1343,
    studentName:'',
    examName:"",
    structerArr:[],
    contentData:''
  },
  imageLoad: function (e) {
    console.log(e)
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (!options.info){
      this.getAnswerList();
      return
    }
    let studentInfo = JSON.parse(options.info);
    this.setData({
      examId: options.examId,
      studentId: studentInfo.id
    },()=>{
      this.getAnswerList();
    })
    
  },
  renderLatex(html) {
    if (!html || html.length == 0) return html;
    let imgpattern = /\s+src="\/?/g;
    let s = html.replace(imgpattern, ' src="https://teacher.yuangaofen.com/img/');
    imgpattern = /\s+src='\/?/g;
    s = s.replace(imgpattern, " src='https://teacher.yuangaofen.com/img/");
    imgpattern = /url\('\/?/g;
    s = s.replace(imgpattern, ' url(\'https://teacher.yuangaofen.com/img/');
    let pattern = /\\\((\S+?)\\\)/g;
    s = s.replace(pattern, '<img src="http://latex.codecogs.com/png.latex?$1"/>');
    pattern = /<table.+?>/g;
    s = s.replace(pattern, '<table style="display:inline-block;vertical-align:middle;">');
    return s;
  },
  showContent(el){
    
    console.log(el.currentTarget.dataset.index)
    let questionId = el.currentTarget.dataset.info.id;
    let index = el.currentTarget.dataset.index;
    this.data.structerArr[index].active = !this.data.structerArr[index].active;
    this.setData({
      structerArr: this.data.structerArr
    })
    questionInfo({
      questionId: questionId,
      studentId: this.data.studentId,
      examId: this.data.examId
    }).then(res => {
      console.log(res);
      if(res.code==10000) {
        this.listContent(res.data,index);
      }
    })
  },
  listContent(data,index){  //对取到的题块详细内容做处理
  
    data.answer2 = this.renderLatex(data.answer2)
    data.question_pic = data.question_pic && JSON.parse(data.question_pic);
    data.answer_pic = data.answer_pic && JSON.parse(data.answer_pic);
    if (data.like&&data.like.length>0){
      data.like.map(item => {
        console.log(item.title)
        item.title = this.renderLatex(item.title)
        item.answer2 = this.renderLatex(item.answer2)
        item.knowledges = this.renderLatex(item.knowledges)
        // WxParse.wxParse(`htmlDom`, 'html', item.title, this, 5);
        item.isShow = false;
        return item;
      });
    }
    
    this.data.structerArr[index].childData = data;
    this.setData({
      structerArr: this.data.structerArr
    })
    console.log(this.data.structerArr)
  },
  showChild(el){
    let item = el.currentTarget.dataset.info;
    let parentIndex = el.currentTarget.dataset.parent;
    let childIndex = el.currentTarget.dataset.child;
    console.log(item);
    this.data.structerArr[parentIndex].childData.like[childIndex].isShow = !this.data.structerArr[parentIndex].childData.like[childIndex].isShow;
    console.log(this.data.structerArr)
    this.setData({
      structerArr: this.data.structerArr
    })
  },
  getAnswerList() { //获取题块数据
    studentMisTakeInfo({
      studentId: this.data.studentId,
      examId: this.data.examId
    }).then(res => {
      console.log(res)
      if(res.code!=10000){
        return
      }
      res.data.structer.map(item => {
        item.active = true;
        return item;
      })
      this.setData({
        showCon:true,
        contentData:res.data,
        studentName: res.data.student_name||'',
        examName: res.data.exam_name||'',
        structerArr: res.data.structer
      })
      
    })
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: '023-63128778' // 仅为示例，并非真实的电话号码
    })
  },
  toContent(el){
    let questionId = el.currentTarget.dataset.id;
    this.setData({
      toView: `toView_${questionId}`
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