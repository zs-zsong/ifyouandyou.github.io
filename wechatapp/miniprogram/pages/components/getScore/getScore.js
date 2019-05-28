import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
import {
  getMarkingInfoList
} from '../../../lib/api.js';
let chart;
let arrTest = [];
let _this;
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  var originDates = [];
  arrTest.forEach(function (obj) {
    originDates.push(obj.question);
  });
  console.log(_this)
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
 
  chart.interval().position('question*avg').color('avg', ['#FFAA00', '#24C789', '#FFAA00']).style({
    radius: [8, 8, 0, 0]
  });
  chart.interaction('pan');
  chart.render();
  chart.interaction('interval-select', {
    onEnd: function onEnd(ev) {
      if(!ev.data){
        return
      }
      _this.setData({
        studentInfo: ev.data
      })
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
    examId: {
      type: Number,
      observer: function (newVal, oldVal) {

      }
    }
  },
  data: {
    questionId:'',
    studentInfo:'',
    isShow:false,
    showModel:false,
    showStudent:false,
    opts: {
      onInit: initChart
    },
  },
  ready() {
    _this = this;
    this.getData();
  },
  methods: {
    lookStudent(el){
      console.log(el.currentTarget.dataset.info.questionId)
      this.setData({
        isShow:true,
        questionId: el.currentTarget.dataset.info.questionId
      })
    },
    getData(){
      getMarkingInfoList({
        id:this.data.examId
      }).then(res=>{
        console.log(res)
        if(res.code == 10000) {
          let data = res.data;
         
          let headArr = [];
          data.map((obj,index) =>{
            if(index<4){
              headArr.push(obj.question)
            }
            if(obj.avg>0){
              chart.guide().text({
                position: [obj.question, obj.avg],
                content: obj.avg,
                style: {
                  textBaseline: 'bottom',
                  textAlign: 'center'
                },
                offsetY: -8
              });
            }
            
          });
          chart.source(arrTest, {
            question: {
              tickCount: 4,
              values: headArr
            }
          });
          this.setData({
            studentInfo: data&&data[0]
          })
          chart.changeData(data)
        }

      })
    },


    closeModel() {
      this.setData({
        showModel: false
      });
    },
    checkInfo() {
      this.setData({
        showModel: true
      });
    },
    onMyEvent(el) {
      console.log(el)
    },
  }

});
