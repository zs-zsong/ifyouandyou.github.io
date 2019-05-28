

import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖

import {
  getQuestionChoiceRateList
} from '../../../lib/api.js';
let chart;
var data = [];
let _this;
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data);
  chart.coord('polar');
  chart.legend(false);
  chart.axis(false);
  chart.interval().position('name*percent').color('name').style({
    lineWidth: 1,
    stroke: '#fff'
  });
  chart.render();
  chart.interaction('interval-select', {
    onEnd: function onEnd(ev) {
      if (!ev.data) {
        return
      }
      _this.setData({
        selectIndex: ev.data.name
      })
      console.log(ev.data)
    }
  });
  return chart;
}
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    chatData: {
      type: Object,
      // value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        return
        console.log(newVal)
        let answerItem = [];
        newVal.map((item) => {
          answerItem.push({
            "id": item.id,
            "text": item.type
          })
        });
        console.log(answerItem)
        this.setData({
          selectArray: answerItem
        });
        this.listData(newVal[0].proportion)
      }
    },
    examId: {
      type: Number,
      observer: function (newVal, oldVal) {
        
      }
    }
  },

  data: {
    contentArr:[],
    headIndex:0,

    selectIndex:'',
    selectArray: [],
    totleNum: 0,
    showData: [],  //右侧信息
    opts: {
      onInit: initChart
    },
  },
  // pageLifetimes: {
  //   // 组件所在页面的生命周期函数
  //   show() {
  //     console.log(this)
  //     this._drowChart();
  //    },
  //   hide() { },
  //   resize() { },
  // },  
  ready() {
   _this = this;
    this.init();
  },
  methods: {
    toRight(){
      if (this.data.headIndex == this.data.contentArr.length-1){
        return
      }
      this.setData({
        headIndex:++this.data.headIndex
      })
      let chatData = [];
      for (let key in this.data.contentArr[this.data.headIndex].rate) {
        chatData.push({
          name: key,
          percent: this.data.contentArr[this.data.headIndex].rate[key]
        })
      };
      console.log(chatData)
      this.setData({
        selectIndex: chatData[0].name,
        showData: chatData
      });
      chart.changeData(chatData);
    },
    toLeft() {
      if (this.data.headIndex == 0) {
        return
      }
      this.setData({
        headIndex: --this.data.headIndex
      })
      let chatData = [];
      for (let key in this.data.contentArr[this.data.headIndex].rate) {
        chatData.push({
          name: key,
          percent: this.data.contentArr[this.data.headIndex].rate[key]
        })
      };
      console.log(chatData)
      this.setData({
        selectIndex: chatData[0].name,
        showData: chatData
      });
      chart.changeData(chatData);
      
    },
    init(){
      getQuestionChoiceRateList({
        id:this.data.examId
      }).then(res=>{
        console.log(res)
        let arr = [];
        if(res.code==10000) {
          let resultData = res.data;
          resultData.map(item=>{
            item.rate = JSON.parse(item.rate);
            return item;
          })
          console.log(resultData)
          let chatData=[];
          for (let key in resultData[this.data.headIndex].rate) {
            chatData.push({
              name: key,
              percent: resultData[this.data.headIndex].rate[key]
            })
          };
          console.log(chatData)
          this.setData({
            selectIndex: chatData[0].name,
            contentArr: resultData,
            showData: chatData
          });
          chart.changeData(chatData);
        }
      })
    },

    myGet(data){
      console.log(data)
      console.log(this.data.chatData);
      this.data.chatData.map((item)=>{
        if (item.id == data.detail.id){
          this.listData(item.proportion)
        }
      });
     
    },
    listData(data){
      let chatData = [];
      for (let key in data) {
        chatData.push({
          name: key,
          percent: data[key]
        })
      };
      this.setData({
        selectIndex: chatData[0].name,
        showData: chatData
      });
      
      chart.changeData(chatData)
    }
  }

});
