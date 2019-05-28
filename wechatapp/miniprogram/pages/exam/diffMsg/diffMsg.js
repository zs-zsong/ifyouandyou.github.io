

import {
  examInforMation,
  updateStructer,
  updateExamStatus,
  exportExamDataQuestion
} from '../../../lib/api';
const app = getApp();

let maxArr = [],finalArr = [];
Page({
  data: {
    examId:1,
    examName:'',
    examData:[],
    originPic:[]
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '答案识别校验 2/2'
    })
    this.setData({
      examName:options.examName,
      examId:options.examId ||425
    },()=>{
      this.getData();
    })
    
  },
  bindinput(e){
    var reg = /^[a-zA-Z]+$/g;
    let status = reg.test(e.detail.value)
    console.log(status)
    console.log(e)
    if (!status){
      let index = e.currentTarget.dataset.index;
      let item = e.currentTarget.dataset.item;
      this.data.examData[index].answer = '';
      wx.showToast({
        icon: 'none', //success / fail / exception / none
        title: '识别结果只能为字母',
        duration: 3000
      });
      this.setData({
        examData: this.data.examData
      })
    }
    
  },
  getData (){
    examInforMation({
      examId:this.data.examId
    }).then((res)=>{
      if (!res.data.questionStructer){
        return;
      }
      finalArr = [];
      this.listData(res.data.questionStructer);
      this.setData({
        originPic: res.data.answer
      })
    })
  },
  previewImg(el){
    console.log(this.data.originPic)
    wx.previewImage({
      current: this.data.originPic[0], // 当前显示图片的http链接
      urls: this.data.originPic // 需要预览的图片http链接列表
    })
  },
  modify(el){
    el.target.dataset.item.answer = el.detail.value;
    finalArr.map((item)=>{
      if(item.id==el.target.dataset.item.id) {
        item.answer =  el.detail.value;
      }
      return item;
    })
    this.setData({
      examDatwx:finalArr
    });
    console.log(finalArr)
    // var reg = /[A-Za-z0-9]/g;
    // if(!reg.test(el.detail.value)) {
    //   dd.showToast({
    //     type: 'exception', //success / fail / exception / none
    //     content: '输入错误请重新输入',
    //     duration: 3000
    //   });
    //   this.setData({
    //     examDatwx:[]
    //   });
    //   this.getData();
    //   return false; 
    // }
    if(!el.detail.value) {
      wx.showToast({
        icon: 'none', //success / fail / exception / none
        title: '识别结果不能为空',
        duration: 3000
      });
      return false; 
    }
    let params = {
      id:el.target.dataset.item.id,
      type:5,
      answer:el.detail.value
    }
    updateStructer(JSON.stringify(params)).then((res)=>{
      console.log(JSON.stringify(res));
    })  
  },
  listData(data){
    // url+?x-oss-process=image/crop,x_0,y_0,w_100,h_100
    console.log(data)
    data.map((item)=>{
      item.answer_pic&&(item.answer_pic = JSON.parse(item.answer_pic));
      // let imgInfo = item.answer_pic&&item.answer_pic[0].url1;  //图片坐标信息
      // item.finalUrl = JSON.parse(item.position)[0].url1;
      item.answer_pic = item.answer_pic&&JSON.parse(item.answer_pic);
      // console.log(item)
      // console.log(item.question_type==1||item.question_type==10)
      
      if (item.childList.length!=0) {
        this.listData(item.childList)
      } 

      if( item.question_type==1||item.question_type==10) {
        finalArr.push(item)
      }
    });
    console.log(finalArr)
    if (finalArr.length>0){
      this.setData({
        originPic: finalArr[0].answer_pic&&finalArr[0].answer_pic[0].url1,
        examData: finalArr
      });
    }
  },
  jumpNext(){
    console.log(this.data.examData)
    let flag = true;
    finalArr.map((item)=>{
      if(!item.answer) {
        flag =false
      }
    })
    if(!flag){
      wx.showToast({
        icon: 'none', //success / fail / exception / none
        title: '识别结果不能为空',
        duration: 3000
      });
      return;
    }

    exportExamDataQuestion({
      examId:this.data.examId
    }).then((res)=>{
      wx.navigateTo({
        url: '/pages/grade/grade?examid=' + this.data.examId + '&examName=' + this.data.examName
      })   
    }).catch((error)=>{
      console.log(error)
    })
    
  }
});
