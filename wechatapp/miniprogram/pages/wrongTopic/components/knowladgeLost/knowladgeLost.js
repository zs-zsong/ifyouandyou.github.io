// pages/wrongTopic/compoents/knowladgeLost/knowladgeLost.js

import {
  getKnowledgePoint
} from '../../../../lib/api';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    examId: {
      type: Number,
      observer: function (newVal, oldVal) {
        if(newVal) {
            this.getInfo();
        }
      }
    },
    studentId: {
      type: Number,
      observer: function (newVal, oldVal) {
        // this.getInfo();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showSearch:true,
    typeBar:1,
    start: 0,
    contentArr:[],
    maxScore:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchStudent(el){
      console.log(el.currentTarget.dataset.info)
      this.setData({
        showSearch: true,
        typeBar: el.currentTarget.dataset.info
      },()=>{
        this.getInfo();
      })
    },
    cancle(){
      this.setData({
        showSearch: true
      })
    },
    choseKnowladge(){
      this.setData({
        showSearch:false
      })
    },

    showContent(el){
      let index = el.currentTarget.dataset.index;
      let info = el.currentTarget.dataset.info;
      this.data.contentArr[index].active = !this.data.contentArr[index].active;
      this.setData({
        contentArr: this.data.contentArr
      })
      console.log(index)
      console.log(info)
    },
    getInfo(){
      // getQuestionChoiceRateList({

      // })
      let maxScore = 0;
      getKnowledgePoint({
        id:this.data.examId,
        start:this.data.start,
        type: this.data.typeBar,
        studentId:this.data.studentId
      }).then(res=>{
       
        if(res.code != 10000){
          return
        }
        let data = res.data;
        data.map(item=>{
          item.active = false;
          if (item.fullMark > maxScore){
            maxScore = item.fullMark;
          }
          return item
        })
        console.log(data)
        this.setData({
          maxScore: maxScore,
          contentArr: data
        })
      })
    },
    toLostList(el){
      let data = el.currentTarget.dataset.info;
      if (data.studentLoseCentInfos.length==0){
        wx.showToast({
          icon: 'none', //success / fail / exception / none
          title: '没有丢分的人',
          duration: 3000
        });
        return
      }
      wx.navigateTo({
        url: `/pages/wrongTopic/loseList/loseList?dataInfo=${JSON.stringify(el.currentTarget.dataset.info)}`
      })
    }
  }
})
