import {
  getMyClass,
  getGradeKaoshiList,
  lookThreeRate,
  getTopAndLast,
  getStudentScoreInClass,
  getRate,
  getClassRate,
  getAvgMaxTrend_forClassAndGrade,
  getAvgMaxTrend_forClassAndGradeTwo,
  getAllByClass,
  get_exam_data,
  get_xk_info,
  get_xk_rank_percent,
  getClassAvgMaxCompareGrade_And_threeRate,  //获取年级班级最大最小
  getStudentName,
  getStudentInfor,
  getAllExamByExamId,
  getExamGeneal,
  getExamInfoByExamid,
  getRankInfo,
  getThreeModulusInfo,
  getTopicScopeCondition,
  getChoiceRate,
  getQuestionChoiceRateList,
  getAllExamByTeachrId
} from '../../../lib/api';
const app = getApp();
Page({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  data: {
    array: [],
    examArr:[],
    index: 0,
    type:0,
    examId:181,
    studentId:'',
    clientHeight:0,
    columnData:'',
    columnStudentData: '',   //学生信息（前五名后五名）
    examRatioData: '',   //考试三率
    studentSpreadData:'',   //各分段人数分布
    getScoreData:'',
    studentScoreData:'', //学生信息
    chooseData: '',  //客观题选择率
    gradeRankData:''  //客观题选择率
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.examArr)
    for (let key in this.data.examArr) {
      if (this.data.examArr[key] == this.data.array[this.data.index]) {
        console.log("选中的id",key)
        this.setData({
          examId: key
        })
      }
    }
    
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type || 1,
      examId: options.examId||1211,
      studentId: options.studentId || 181
    },()=>{
      this.getChartsData();
      this.getExamList();
    })  
  },
  getExamList(){
    getAllExamByTeachrId().then(res=>{
      console.log(res)
      if(res.code == 10000){
        let arr = [], index = 0;
        for(let key in res.data){
          arr.push(res.data[key]);
         
          if (key == this.data.examId) {
            index = index;
            this.setData({
              index: index
            })
          }
          ++index;
        }
        console.log(index)
        this.setData({
          array:arr,
          examArr:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          clientHeight: res.windowHeight
        })
      }
    })
    // this._drowChartColumn();
  },
  
  getChartsData(){ //获取图表信息
    let childPropsData = {};
    if(this.data.type ==1) {
      
      // getRankInfo({ //本次考试学生排名
      //   id: this.data.examId
      // }).then((res) => {
      //   console.log(res)
      //   this.setData({
      //     studentSpreadData: res.data
      //   })
      // });
      
      // getTopicScopeCondition({ //获取各小题得分情况
      //   id: this.data.examId
      // }).then((res) => {
      //   console.log(res)
      //   this.setData({
      //     getScoreData: res.data
      //   })
      // });
      
    } else {
      getStudentInfor({ //本次考试成绩概况平均分最高分
        examId: this.data.examId,
        studentId: this.data.studentId
      }).then((res) => {
        console.log(res)
        if(!res.data){
          return
        }
        let data = res.data;
        data.classAvg = data.classAvg;
        data.beat = data.beat;
        this.setData({
          studentScoreData:data,
          gradeRankData: data.all
        })
        console.log(this.data.studentScoreData)
      })
    }
    
    
    
    //   getExamGeneal: getExamGenealData.data,
    //   getExamInfoByExamid: getExamInfoByExamidData.data,
    //   getRankInfo: getRankInfoData.data,
    //   getThreeModulusInfo: getThreeModulusInfoData.data,
    //   getTopicScopeCondition: getTopicScopeConditionData.data,
    // };
    console.log(childPropsData)
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
});