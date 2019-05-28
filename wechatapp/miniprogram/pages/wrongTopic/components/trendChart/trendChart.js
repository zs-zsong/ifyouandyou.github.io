
import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖

let chart;
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  let data  = [];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  // var defs = {
    
  //   tem: {
  //     type:'linear',
  //     // tickCount: 5,
  //     // min: 10,
  //     alias: '排名'
  //   }
  // };
  chart.source(data);
  // chart.axis('time', {
  //   label: function label(text, index, total) {
  //     var textCfg = {};
  //     if (index === 0) {
  //       textCfg.textAlign = 'left';
  //     } else if (index === total - 1) {
  //       textCfg.textAlign = 'right';
  //     }
  //     return textCfg;
  //   }
  // });
  chart.tooltip({
    showCrosshairs: true,
    background: {
      radius: 2,
      fill: '#FFAA00',
      padding: [6, 10]
    }, 
    crosshairsStyle: {
      stroke: '#FFAA00',
      lineWidth: 2
    },
    showItemMarker: false,
    titleStyle: {
      fontSize: 24,
      fill: '#fff',
      textAlign: 'start',
      textBaseline: 'top'
    },
  });
  chart.line().position('time*tem').shape('smooth').color('#FFAA00');
  chart.point().position('time*tem').shape('smooth').style({
    stroke: '#fff',
    lineWidth: 1
  }).color('#FFAA00');
  chart.render();
  return chart;
}
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    content: {
      type: Object,
      // value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        let arr = [];
        console.log(newVal.all)
        newVal.all.map(item =>{
          arr.push({
            time: item.exam_name,
            tem: item.rank
          })
        })
        this.setData({
          finalArr:arr
        })
        console.log(newVal)
        
      }
    },
    name: {
      type: String,
      // value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        // return
      }
    }
  },

  data: {
    finalArr:[],
    totleNum: 0,
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
    let timer;
    timer =setInterval(()=>{
      if (this.data.finalArr){
        chart.changeData(this.data.finalArr);
        clearInterval(timer)
      }
    },2000);
   
    // this._drowChart();   
  },
  methods: {
  }

});
