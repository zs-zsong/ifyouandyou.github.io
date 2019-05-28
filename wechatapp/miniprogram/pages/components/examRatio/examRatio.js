import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
import {
  getThreeModulusInfo,
  getDiyRate
} from '../../../lib/api';
let chart;
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  let data = [];
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
  chart.interval().position('year*sales').color('year', ['#FF6047', '#24C789', '#FFAA00']).style({
    radius: [8, 8, 0, 0]
  });
  chart.render();
  return chart;
}
const app = getApp();
import {
  setThreeModulus
} from '../../../lib/api.js';
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
        console.log(newVal)
        setTimeout(() => {
         
        }, 1000)
      }
    },
    examId: {
      type: Number,
      value: '787',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        console.log(newVal)
        if(newVal){
          this.getRatio()
        }
      }
    }
  },
  data: {
    opts: {
      onInit: initChart
    },
    showTop:false,
    width:200,
    height:200,
    chart: null,
    oneNum:'',
    twoNum:'',
    threeNum:'',
    inputInfo:'',
    inputInfoOne:''
    // isShow:false
  },
  ready() {
    
  },
  methods: {
    tapInput() {
      this.setData({
        //在真机上将焦点给input
        inputFocus: true,
        //初始占位清空
        inputInfo: ''
      });
    },

    /**
     * input 失去焦点后将 input 的输入内容给到cover-view
     */
    blurInputOne(e) {
      this.setData({
        inputInfoOne: e.detail.value || ''
      });
      console.log({
        id: this.data.examId,
        arg1: this.data.inputInfo,
        arg2: this.data.inputInfoOne
      })
      if (this.data.inputInfo && this.data.inputInfoOne) {
        getDiyRate({
          id: this.data.examId,
          arg1: this.data.inputInfo,
          arg2: this.data.inputInfoOne
        }).then(res => {
          console.log(res)
          if(res.code==10000){
            this.getRatio();
          }
        })
      }
    },
    tapInputOne() {
      this.setData({
        //在真机上将焦点给input
        inputFocusOne: true,
        //初始占位清空
        inputInfoOne: ''
      });
    },

    /**
     * input 失去焦点后将 input 的输入内容给到cover-view
     */
    blurInput(e) {
      this.setData({
        inputInfo: e.detail.value || ''
      });
      if (this.data.inputInfo && this.data.inputInfoOne){
        getDiyRate({
          id:this.data.examId,
          data:{
            arg1: 1,
            arg2: 23
          }
        }).then(res=>{
          console.log(res)
        })
      }

    },
    changeTop(){
      this.setData({
        showTop: true
      })
    },
    cancle(){
      this.setData({
        showTop: false
      })
    },
    getRatio(){  //获取三率
      getThreeModulusInfo({ //获取本次考试三率对比
        id: this.data.examId
      }).then((res) => {
        console.log(res)
        let data = [
          { year: '差生率', sales: parseInt(res.data['3']) }, { year: '及格率', sales: parseInt(res.data['1']) }, { year: '优秀率', sales: parseInt(res.data['1']) }
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
    },
    showSet() {
      this.setData({
        isShow: true
      })
    },
    
  },
});
