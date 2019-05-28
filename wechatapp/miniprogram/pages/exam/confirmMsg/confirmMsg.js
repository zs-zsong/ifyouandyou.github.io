

import {
  examInforMation,
  updateStructer,
  getSubject,
  errExamLog,
  exportExamDataQuestion
} from '../../../lib/api';
const app = getApp();

let maxArr = [],finalArr = [];
let timer;
let maxLen;  //获取最大层级
let childFlag,
    scoreList,     //题块总分key-value对象
    flag=false,
    getNum = 0,   //题块接口获取次数
    middleData=[];
Page({
  data: {
    showIndex:-1,  //显示第几大块
    showArr:[],  //需要显示的数组
    examName:'',
    examClass:'',
    arr:15,
    subject:'',
    id:'',
    examId:6,
    examDatwx:[],
    totalScore:0,
    anserTotle:'',
    score:'',
    maxLen:0,
    parentId:'',
    array: [],
    index:0,
    treeData : {
      zIndex: 1,
      childList: []
    },
    treeDataScore: {},

    showFeedBack: true,
    showFeedSuccess:true,
    emptyData: [],   //树里面修改后为空的值
    emptyDataScore:[],   //树里面修改后为空的值
    finish:false
  },
  onUnload() {
    console.log('close')
    flag = false;
    getNum = 0;
    middleData= [];
    timer && clearInterval(timer);
    timer = '';
  },
  onLoad(option) {
    getSubject().then((res)=>{  //获取考试科目
      console.log(res)
      let data = [];
      res.data.map((item)=>{
        data.push(item.subject)
      })
      finalArr= [];
      this.setData({
        flag:false,
        array: data,
        examId:option.examId || 22
      },()=>{
        this.getData();
      })
    })

    
  },
  feedBack(){  //反馈
    this.setData({
      showFeedBack: false
    })
  },
  feedCancle(){
    console.log('cancle')
    this.setData({
      showFeedBack: true
    })
  },
  feddSend() {  //调取反馈接口
    errExamLog({
      examId:this.data.examId
    }).then(()=>{
      this.setData({
        showFeedSuccess:false
      },()=>{
        setTimeout(()=>{
          app.globalData.footerType = 2;
          this.setData({
            showFeedBack:true
          },()=>{
            wx.redirectTo({
              url: '/pages/home/home'
            })
          })
        },2000)
      })
    })
  },
  //事件处理函数
  inputChange(el){  //输入为空处理
    let data = el.detail.data;
    if (!data.score || !data.question_num ) {
      this.data.emptyData.push(data)
    } else if (data.score != data.originScore) {
      this.data.emptyDataScore.push(data)
    } else {
      let lastData = [], lastDataScore=[];
      this.data.emptyData.map((item,index)=>{
        if(item.id!=data.id) {
          lastData.push(item);
        }
      });
      this.data.emptyDataScore.map((item, index) => {
        if (item.id != data.id) {
          lastDataScore.push(item);
        } 
      });
      this.setData({
        emptyDataScore:lastDataScore,
        emptyData: lastData
      })
    }
    console.log(this.data.emptyData);
    console.log(this.data.emptyDataScore);
  },
  tapItem: function (e) {
    console.log('index接收到的itemid: ' + e.detail.itemid);
    this.getData();
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subject:'',
      index: e.detail.value
    },()=>{
      let params = {
        id: this.data.examId,
        type: 6,
        subject: this.data.array[e.detail.value]
      };
      updateStructer(JSON.stringify(params)).then((res) => {
        console.log(JSON.stringify(res));
      }).catch((error) => {
        console.log('[error]', JSON.stringify(error))
      })
    })
  },
  getDataAlways(){
    if(!timer){
      timer = setInterval(()=>{
        this.getData((res)=>{
           if (res.data.questionStructer) {
            clearInterval(timer);
            this.setData({
              finish: true
            })
          };
        });
      },2000)
    }   
  },
  focusName(el){
    if(el.detail.value == '未识别') {
      this.setData({
        examName:''
      })
    }
  },
  focusClass(el) {
    if (el.detail.value == '未识别') {
      this.setData({
        examClass: ''
      })
    }
  },
  modify(el){
    if(!el.detail.value) {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 2000
      })
      return; 
    }
    
    finalArr= [];
    let type = el.target.dataset.info,params = {};
    if(type==1) { // 1 改考试名字 2 更改年级和班级，3 改题号，4 改分数 5 改答案
      params = {
        id:this.data.examId,
        type:1,
        examName:el.detail.value
      }
      console.log(el.detail.value)
      this.setData({
        examName: el.detail.value
      });
    } else if (type==2) {
      params = {
        id:this.data.examId,
        type:2,
        examGrade:el.detail.value,
        examClass:el.detail.value
      }
      this.setData({
        examClass: el.detail.value
      });
    } else if (type==5) {
      params = {
        id:'',
        type:5,
        answer:el.detail.value
      }
    } else if (type==6) {  //总分识别
      params = {
        id:this.data.id,
        type:4,
        score:el.detail.value
      };
      this.setData({
        score:el.detail.value
      });
    };
    updateStructer(JSON.stringify(params)).then((res)=>{
      console.log(JSON.stringify(res));
      this.getData();
    }).catch((error)=>{
      console.log('[error]',JSON.stringify(error))
    })
  },
  getData (callback){
      examInforMation({
        examId:this.data.examId
      }).then((res)=>{
        callback&&callback(res)
        if(res.code!=10000 || !res.data.questionStructer) {
          this.getDataAlways();
          return;
        }
        middleData = [];
        if (res.data.answer.length!=0) {   //判断有无参考答案
          flag = true;
        }
        this.listData(res.data.questionStructer, res.data.scoreList);
        
        this.setData({
          emptyDataScore: middleData
        });
        
        middleData.length>0&&this.setData({
          emptyDataScore: middleData
        });
        let score=0;
        res.data.questionStructer.map((item)=>{
          score+=item.score;
        });
        this.setData({
          finish:true,
          totalScore: score,
          anserTotle: res.data.scoreList[res.data.id]
        });
        console.log(res.data.questionStructer)
        let _treeData = {
          text: 'My Tree',
          id: 0,
          zIndex: 1,
          childList: res.data.questionStructer
        };
        Array.prototype.findIndex = function (arr) {
              for (var i = 0; i < this.length; i++) {
                    if (this[i] == arr) {
                          return i;
                    }

              }
        }
        let subIndex = this.data.array.findIndex(res.data.subject);
        console.log(subIndex)
        this.setData({
          index: subIndex||0,
          examClass:res.data.examClass,
          subject: res.data.subject,
          examName:res.data.exam,
          parentId:res.data.id,
          examId:res.data.examId,
          score:res.data.score,
          id:res.data.id,
          treeDataScore: res.data.scoreList,
          treeData: _treeData
        });
      })
  },
  getMaxLen(data,index){
    data.map((item)=>{
      let i =index?index:1;
      if(item.childList.length==0) {
        maxArr.push(i);
      } else {
        ++i;
        this.getMaxLen(item.childList,i)
      }
    });
    maxArr.sort((pre,next)=>{
      return next-pre
    })
    return maxArr[0];
  },
  // getChildScore(data){
   
  //   data.map((item)=>{
  //     if(item.childList){
  //       this.getChildScore(item.childList);
  //     } else {
  //       totleScoreChild+=item.score;
  //     }
  //   });
  //   return totleScoreChild
  // },
  listData(data,schoolList){
    data && data.map((item)=>{
      
     
      if (item.childList.length>0) {
        if (!item.score){
          item.score = schoolList[item.id];
          item.originScore = item.score;
        } else {
          item.originScore = schoolList[item.id];
        }
        this.listData(item.childList, schoolList)
      } else {
        item.originScore = item.score;
      }
      if (item.score != schoolList[item.id] && schoolList[item.id] || !item.score) { //判断总分是否有错误
        console.log(item)
        console.log(schoolList[item.id], item.score)
        middleData.push(item)
      }
      return item;
    })
   
    
  },
  getTotleScore(data){
    let totleScore=0;
    data.map((item)=>{
      totleScore+=item.score;
      if (item.childList.length > 0) {
        totleScore+=this.getTotleScore(item.childList)
      }
    });
    return totleScore;
  },
  toggleClick(el){
    this.setData({
      showIndex:el.target.dataset.info.childFlag
    },()=>{
      this.hideColumn(el.target.dataset.info.id);
    });
  },
  hideColumn(id){
    var arr = [];
    finalArr.map((item,index)=>{
      
      var childFlag,isParent;
      item.map((itemChild,indexChild)=>{
        if(itemChild&&indexChild!=0) {
          isParent = itemChild.isParent
          childFlag = itemChild.childFlag;
        }
        if (itemChild.id == id) {
          itemChild.isFold = !itemChild.isFold;
          if (!itemChild.isFold) {
            
            this.setData({
              showIndex:-1
            });
          }
        }
        return itemChild
      })
      if(this.data.showIndex==childFlag || isParent) {
        arr.push(item)
      }
    });
    this.setData({
      showArr:arr
    });
  },
  jumpNext(){
    console.log(middleData)
    console.log(this.data.treeData)
    
    if (this.data.emptyData.length!=0) {
      wx.showToast({
        title: '题号或分值不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log(this.data.emptyDataScore)
    if (this.data.emptyDataScore.length != 0) {
      wx.showToast({
        title: '分值错误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.examName == '未识别') {
      wx.showToast({
        title: '请完善考试名称',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.examClass == '未识别') {
      wx.showToast({
        title: '请完善考试班级',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log("{flag}",flag)
    if (!flag) {  // 有参考答案
      exportExamDataQuestion({
        examId: this.data.examId
      }).then((res) => {
        wx.navigateTo({
          url: '/pages/grade/grade?examid=' + this.data.examId + '&examName=' + this.data.examName 
        })
      }).catch((error) => {
        console.log(error)
      });
      return;
    }
    
    wx.navigateTo({
      url: '../diffMsg/diffMsg?examId=' + this.data.examId + '&examName=' + this.data.examName
    })
  }
});
