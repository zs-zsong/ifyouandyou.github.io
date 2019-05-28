
import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
import {
  getQuestionChoiceRateList,
  getBaseSubsectionNumber
} from '../../../lib/api';

const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    examId: {
      type: Number,
      observer: function (newVal, oldVal) {
        console.log(newVal)
        this.init(); 
      }
    }
  },
  data: {
    maxLen:0,
    scoreData:[]
  },
  
  ready() {
    // console.log(wxCharts)
    // this._drowChart(); 
    
  },
  pageLifetimes: {
    show() {
      this.init(); 
    },
  },
  methods: {
    jumpSet(){
      wx.navigateTo({
        url: `/pages/wrongTopic/scoreItem/scoreItem?examId=${this.data.examId}`
      })
    },
    init(){
      getBaseSubsectionNumber({
        id:this.data.examId
      }).then(res=>{
        console.log(res)
        if(res.code==10000){  
          console.log(this.getMaxLen(res.data))
          this.setData({
            scoreData:res.data,
            maxLen: this.getMaxLen(res.data)
          })
        }
      })
    },
    getMaxLen(data){
      let len=0;
      for(let i in data) {
        if(data[i].length>len) {
          len = data[i].length
        }
      };
      return len;
    },
  }

});
