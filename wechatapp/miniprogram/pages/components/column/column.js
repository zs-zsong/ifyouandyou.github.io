
import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
import {
  getExamGeneal,
  getExamInfoByExamid,
  getExamBaseInfo,
  getAssignRnakAvg
} from '../../../lib/api';

let chart,timer;
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  let data =[];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.legend(false);
  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.axis('year', {
    grid: {
      lineDash: null,
      stroke: '#e8e8e8',
      lineWidth: 1
    }
  });
  chart.interval().position('year*sales').color('year', ['#D08FFF', '#24C789', '#FFAA00']).style({
    radius: [8, 8, 0, 0]
  });
  
  chart.render();
  return chart;
}
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    examId:{
      type: Number,
      value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        console.log('变化id',newVal)
        timer=setInterval(()=>{
          if(chart) {
            clearTimeout(timer);
            this.getExamData();
          }
        },1000)
      }
    },
  },
  data: {
    showTop:false,
    baseInfo:'',  //基本信息
    totleNum:0,
    preStudentData: new Array(5),
    nextStudentData: new Array(5),
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
    
    // console.log(wxCharts)
    // this._drowChart();   
  },
  methods: {
    /**
     * 将焦点给到 input（在真机上不能获取input焦点）
     */
    tapInput() {
        this.setData({
            //在真机上将焦点给input
            inputFocus:true,
            //初始占位清空
            inputInfo: ''
        });
    },

    /**
     * input 失去焦点后将 input 的输入内容给到cover-view
     */
    blurInput(e) {
        this.setData({
            inputInfo: e.detail.value || ''
        });
      getAssignRnakAvg({
        id:this.data.examId,
        num: e.detail.value
      }).then(res=>{
        console.log(res)
        this.getExamData();
      })

    },

    changeTop(){
      this.setData({
        showTop:true
      })
    },
    cancle(){
      this.setData({
        showTop: false
      })
    },
    getExamData(){
      getExamBaseInfo({
        id:this.data.examId
      }).then(res=>{
        if(res.code==10000) {
          this.setData({
            baseInfo:res.data
          })
        }
        console.log(res)
      })
      getExamGeneal({ //获取本次考试成绩概况
        id: this.data.examId
      }).then((res) => {
        if (res.code != 10000) {
          return
        }
       
        let data = [
          { year: '平均分', sales: res.data.avgScore },
          { year: '前十最高分', sales: res.data.maxScore },
          { year: '最高分', sales: res.data.maxScore }
        ];
        data.map(function (obj) {
          chart.guide().text({
            position: [obj.year, obj.sales],
            content: obj.sales,
            style: {
              textBaseline: 'bottom',
              textAlign: 'center'
            },
            offsetY: -8
          });
        });
        chart.changeData(data)
        
      });
      getExamInfoByExamid({ //通过考试id获取本次考试的考试分析结果
        id: this.data.examId
      }).then((res) => {
        if (res.data.length >= 10) {
          this.setData({
            totleNum: res.data.length,
            preStudentData: res.data.slice(0, 5),
            nextStudentData: res.data.slice(-5)
          })
        } else if (res.data.length >= 5 && res.data.length < 10) {
          let nextStudentData = [].concat(res.data.slice(5, res.data.length), new Array(10 - res.data.length));
          console.log(res.data.slice(5, res.data.length))
          console.log(nextStudentData)
          this.setData({
            totleNum: res.data.length,
            preStudentData: res.data.slice(0, 5),
            nextStudentData: nextStudentData
          })
        } else {
          this.setData({
            totleNum: res.data.length,
            preStudentData: res.data.slice(0, 5)
          })
        }
      });
    }
  }
  
});
