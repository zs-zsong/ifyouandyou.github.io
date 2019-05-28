// pages/wrongTopic/components/studentList/studentList.js


import {
  getTopicunionStudent
} from '../../../../lib/api.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      observer: function (newVal, oldVal) {

      }
    },
    examId: {
      type: Number,
      observer: function (newVal, oldVal) {
       
      }
    },
    questionId: {
      type: Number,
      observer: function (newVal, oldVal) {
        console.log(newVal,this.data.examId)
        if(newVal) {
          this.getStudentList();
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    studentData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getStudentList(){
      getTopicunionStudent({
        id:this.data.examId,
        questionId:this.data.questionId
      }).then(res=>{
        console.log(res)
        if(res.code!=10000) {
          return;
        }
        this.setData({
          studentData:res.data
        })
        
      })
    },
    close(){
      this.setData({
        isShow:false  
      })
    }
  }
})
