// pages/exam/confirmMsg/layer/layer.js
let timer;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    finish: {
      type: Boolean,
      value: '',
      observer: function (newVal, oldVal) {
        if(newVal){
          this.setData({
            index: 4
          },()=>{
            setTimeout(() => {
              this.setData({
                showLayer: false
              });
            },2000)
            clearInterval(timer)
          })
          
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showLayer:true,
    index:0,
    seconds:0 //三分钟
  },
  ready(){
    this.init();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      timer&&clearInterval(timer);
      timer = setInterval(()=>{
        this.setData({
          seconds: ++this.data.seconds
        })
        if (this.data.seconds > 150) {
          this.setData({
            index: 3
          })
        } else if(this.data.seconds>100) {
          this.setData({
            index:2
          })
        } else if (this.data.seconds > 8) {
          this.setData({
            index: 1
          })
        }
      },1000)
    }
  }
})
