// pages/setRatio/setRatio.js
import {
  setThreeModulus
} from '../../../lib/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        console.log(newVal)
      }
    },
    examId: {
      type: Number,
      // value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        console.log(this.data.examId)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancle(){
      this.setData({
        isShow:false
      })
    },
    bindKeyInputOne(el) {
      this.setData({
        oneNum: el.detail.value
      });
    },
    bindKeyInputTwo(el) {
      this.setData({
        twoNum: el.detail.value
      });
    },
    bindKeyInputThree(el) {
      this.setData({
        threeNum: el.detail.value
      });
    },
    setRatio() {
      setThreeModulus(JSON.stringify({
        examId: this.data.examId,
        threeModulus: {
          "1": this.data.oneNum,
          "2": this.data.twoNum,
          "3": this.data.threeNum
        }
      })).then((res) => {
        console.log(res)
        this.triggerEvent('myevent', {
          type: 1
        });
      })
    }
  }
})
