Component({
  properties: {
    chatData: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        console.log(newVal)
      }
    }
  },
  data: {
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
  }
});
