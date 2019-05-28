var app = getApp();
import {
  getScoreResult,
  publishedResults,
  updateStudentName
} from '../../lib/api';

Page({
  data: {
    id:'',
    list:[],
    gArr:[],
    isaffirm: true, //是否可以查看成绩分析
  },
  onLoad(v) {
    console.log(v);
    this.setData({
      id:v.id
    });
    // this.getList(v.id);
  },
  onShow(){
    this.getList(this.data.id);
  },
  analyze() {//成绩分析
    if (!this.data.isaffirm) return;
    console.log(1111);
    wx.navigateTo({
      url: `/pages/score/scoreAnalyze/scoreAnalyze?type=1&examId=${this.data.id}`
    })
  },
  affirm() {//确认学生姓名
    if (!this.data.isaffirm) return;
    console.log(22);
    this.pushCZ();
  },
  getList(id) {
    getScoreResult({
      examId: id 
    }).then((res)=>{
      console.log(res);
      if (res.code == '10000') {
        let list = []
            ,arr = [];
        for (var i = 0; i < res.data.length; i++) {
          list.push({
            id: res.data[i].id,
            score: res.data[i].score,
            student_name: res.data[i].student_name == '未识别' ? '' : res.data[i].student_name,
            url: JSON.parse(res.data[i].student_namep)[0]&&JSON.parse(res.data[i].student_namep)[0].url,
          })
          if (res.data[i].student_name == '未识别' || !res.data[i].student_name) {
            arr.push(false)
          }else{
            arr.push(true)
          }
        }
        if (arr.includes(false)){
            this.setData({
                isaffirm: false
            });
        }else{
          this.setData({
            isaffirm: true
          }); 
        }
        this.setData({
          list: list
        });
      }
    })
  },
  bindKeyInput(e) {
    this.gName({ id: e.target.dataset.info, name: e.detail.value});
  },
  pushCZ(){
    publishedResults({
      examId: this.data.id
    }).then((res)=>{
      console.log(res);
      if (res.code == '10000') {
        wx.showToast({
          icon: 'none', //success / fail / exception / none
          title: '确认成功',
          duration: 1500
        });
      }
    })
  },
  gName(v) {
    updateStudentName({
      name: v.name,
      id: v.id,
      examId: this.data.id,
    }).then((res)=>{
      console.log(res);
      if (res.code == '10000') {
        this.getList(this.data.id);
      }else{
        if (!v.name) return;
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000,
        })
      }
    })
  },
});
