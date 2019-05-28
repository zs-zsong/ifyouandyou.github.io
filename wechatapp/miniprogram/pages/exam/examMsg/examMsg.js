import {
  getExamProgress,
  getScanningProgress,
  exportExamDataStudent
} from '../../../lib/api';
const app = getApp();

Page({
  data: {
    examId:'6',
    school:'',
    grade:'',
    answerInfo:{
      student:'',
      block:'',
      reference:''
    },
    complete:'',
    classId:''
  },
  onLoad() {
    this.setData({
      examId:app.globalData.examId ||389,
      classId:app.globalData.classId || 348
    },()=>{
      this.exportExamData().then((res)=>{
        console.log(res)
        let params = {
          examId:this.data.examId
        }
        getExamProgress(params).then((res)=>{
          console.log(res)
          if (res.code == 10000) {
            this.setData({
              school:res.data.examName,
              grade:res.data.grade,
              complete:parseInt((res.data.complete/res.data.all)*100)
            })
          }
        });
        getScanningProgress(params).then((res)=>{
          console.log(res)
          if(res.code == 10000){
            let totleNum = res.data.student.studentSubNum,singleLen =res.data.student.studentImg.length>0?res.data.student.studentImg[0].length:0;
            this.setData({
              answerInfo:{
                student:`${totleNum} 人 × ${singleLen} 张/人 = ${totleNum*singleLen} 张`,
                block:res.data.testPaper.testPaperImg.length,
                reference:res.data.answer.answerImg.length
              }
            })
          }
          
        });
      });
    });
  },
  exportExamData(){
    return new Promise((resolve,reject)=>{
      exportExamDataStudent({
        examId:app.globalData.examId ||389,
        classId:app.globalData.classId || 348
      }).then((res)=>{
        resolve(res)
      })
    })
  },
  modify(){
    dd.navigateTo({
      url: '../confirmMsg/confirmMsg'
    })
  },
  toExam(){
    dd.navigateTo({
      url: '/pages/grade/grade?examid='+app.globalData.examId
    });
  },
  preview(){
    dd.navigateTo({
      url: '/pages/gradePreview/gradePreview?id='+app.globalData.examId
    })
  },
  retry(){
    dd.navigateTo({
      url: '../../createExam/createExam?isb=1'
    })
  },
});
