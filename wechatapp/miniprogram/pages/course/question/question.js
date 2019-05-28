// pages/course/questions.js
var app = getApp();
import {
  getCourseQuestionList,
  getCourseRatio,
  getCourseSelectRatio,
  getCourseSubjective,
  getCourseSectionInfo
} from '../../../lib/api';

import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖

let chartdata = [{
  name: 'A',
  percent: 0.4
}, {
  name: 'B',
  percent: 0.3
}, {
  name: 'C',
  percent: 0.2
}, {
  name: 'D',
  percent: 0.1
}];
let chart;
let colorArr = ['#5CB3FF', '#FF6047', '#FFBFB5', '#FFC43F', '#E1A98D'];
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表

  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(chartdata);
  chart.coord('polar');
  chart.legend(false);
  chart.axis(false);
  chart.interval().position('name*percent').color('name', colorArr).style({
    lineWidth: 1,
    stroke: '#fff'
  });
  chart.render();
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    examId: 0,
    opts: {
      onInit: initChart
    },
    question: {},
    questions: {
      qid: 1,
      type: 1, // 1-选择题
      // ...
    },
    currIndex: 0, // 当前题目的index
    tabIndex: 0, // 主观题答题情况tab
    chartData: [],
    chartIndex: -1,
    studentIndex: -1,
    students: [],
    showTitle: true,
    showAnswer: false,
    colorArr: ['#5CB3FF', '#FF6047', '#FFBFB5', '#FFC43F','#E1A98D']
  },

  back(e) {
    wx.navigateBack({
      delta: 1
    });
  },

  selectQuestion(index) {

    var that = this;
    let examId = this.data.examId;
    if (index < 0) {
      // this.setData({question:{}, currIndex: index});
      wx.showToast({
        title: '前面已经没有题了',
        icon: 'none'
      });
      return;
    } else if (index >= this.data.questions.length) {
      wx.showToast({
        title: '已经是最后一题了',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '加载数据中',
    });
    let question = this.data.questions[index];
    // TODO just for test ---- start
    // if (!question.practice){
    //   question.practice = 3;
    // }
    // ---- end
    if (question.questionPic && typeof(question.questionPic) == "string")
      question.questionPic = JSON.parse(question.questionPic);
    if (question.answerPic && typeof (question.answerPic) == "string")
      question.answerPic = JSON.parse(question.answerPic);

    that.setData({
      question: question,
      currIndex: index
    });

    getCourseRatio({
      id: examId,
      qid: question.id
    }).then(res => {
      question = that.data.question;
      if (res.code == 10000) {
        question.avg = res.data.avg;
        question.classRatio = res.data.classRatio;
        question.practice = res.data.acquaintanceTopicSize;
        question.knowledgePoint = res.data.knowledgePoint.join(" | ");
        this.setData({
          question: question
        });
      }
      wx.hideLoading();
    });
    if (question.type == 1) {
      getCourseSelectRatio({
        id: examId,
        qid: question.id
      }).then(res => {
        if (res.code == 10000) {
          
          let data = [];
          for (var i in res.data) {
            res.data[i].isRight = question.answer.indexOf(res.data[i].option) >= 0;
            if (res.data[i].optionRatio > 0){
              data.push({
                name: res.data[i].option,
                percent: res.data[i].optionRatio * 0.01
              });
            }
          }
          that.setData({
            chartData: res.data,
            chartIndex: 0
          });
          chartdata = data;
          setTimeout(() => {
            if (chart)
              chart.changeData(chartdata);
          }, 500);
        }
      });
    } else {
      getCourseSubjective({
        id: examId,
        qid: question.id
      }).then(res => {
        if (res.code == 10000) {
          that.setData({
            answerData: res.data,
            tabIndex: 0
          });
        }
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.id) {
      var examId = options.id;
      this.data.examId = examId;
      getCourseQuestionList({
        id: examId
      }).then(res => {
        that.setData({
          questions: res.data,
          examId: examId
        });
        if (res.data && res.data.length > 0) {
          that.selectQuestion(0);
        }
      })
    }

  },

  /**
   * 表格行切换
   */
  changeChartIndex(e) {
    this.setData({
      chartIndex: e.currentTarget.dataset.index
    });
  },

  /**
   * 单击页面左右两边切换题目
   */
  changeQuestion(e) {
    const WIDTH = 52;
    if (e.target.offsetLeft == 0) {
      if (e.detail.x < WIDTH) {
        this.selectQuestion(this.data.currIndex - 1);
      } else if (e.detail.x > wx.getSystemInfoSync().windowWidth - WIDTH) {
        this.selectQuestion(this.data.currIndex + 1);
      }
    }

  },

  /**
   * 切换主观题答题情况tab
   */
  changeTabIndex(e) {
    let index = e.currentTarget.dataset.index;
    let value = e.currentTarget.dataset.value;
    if (index < 1 || index > 4) return;
    if (!value || this.data.tabIndex == index) {
      this.setData({
        tabIndex: 0
      });
      return;
    }

    var that = this;
    // TODO 获取主观题答题数据
    getCourseSectionInfo({
      id: this.data.examId,
      qid: this.data.question.id,
      type: index
    }).then(res => {
      if (res.code == 10000) {
        // for(var i in res.data){
        //   res.data[i].answerPostion = JSON.parse(res.data[i].answerPostion);
        // }
        this.setData({
          students: res.data,
          studentIndex: 0
        });
      } else {
        this.setData({
          students: []
        })
      }
    });
    this.setData({
      tabIndex: index
    });
  },

  changeStudentIndex(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      studentIndex: index
    });
  },

  previewImg(e){
    let urls = [e.currentTarget.dataset.url];
    // wx.previewImage({
    //   urls: urls  // 需要预览的图片http链接列表
    // });
  },

  searchStudent(e){
    if (e.detail.value.length == 0) return;
    let students = this.data.students;
    for(var i in students){
      if (students[i].studentName.indexOf(e.detail.value) >= 0)
      {
        this.setData({studentIndex: i});
        break;
      }
    }
  },

  toggleTitle(e) {
    this.setData({ showTitle: !this.data.showTitle });
  },

  toggleAnswer(e) {
    this.setData({ showAnswer: !this.data.showAnswer });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function() {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function() {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function() {

  // }
})