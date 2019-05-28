
const app = getApp();
import { CreateExam} from '../../../lib/api';
Component({
  data: {
    type:2,
    brr:[],
    sacnD:[],
    isC:false
  },
  attached() {
    this.setData({
      type:app.globalData.footerType
    });
    // this.getScanTheList();
  },
  pageLifetimes:{
    hide() {
      console.log(11111111111);
      this.setData({
        isC: false
      })
    },
  },
  properties: {
    isYz: {
      type: Boolean,//类型
      value: 'default value'//默认值
    }
  },
  methods: {
    jumpOne(){
      console.log(app.globalData)
      app.globalData.footerType = 2;
      this.setData({
        type: 1
      }, () => {
        this.triggerEvent('myevent', {
          type: 1
        });
      });
    },
    jumpTwo(){
      app.globalData.footerType = 2;
      this.setData({
        type: 2
      },()=>{
        this.triggerEvent('myevent', {
          type: 2
        });
      });
      this.createExam();
    },
    jumpTwo2() {
      app.globalData.footerType = 2;
      this.setData({
        type: 2
      }, () => {
        this.triggerEvent('myevent', {
          type: 2
        });
      });
    },
    jumpThree(){
      app.globalData.footerType = 3;
      this.setData({
        type: 3
      }, () => {
        this.triggerEvent('myevent', {
          type: 3
        });
      });
    },
    createExam() {
      
      if(this.data.isC) return;
      this.setData({
        isC:true
      },()=>{
        CreateExam().then((res) => {
          console.log(res.data);
          if (res.msg == 'OK') {
            console.log(res.data.exam_id)
            wx.navigateTo({
              url: '/pages/createExam/createExam?id=' + res.data.exam_id
            })
          }
        })
      })
  
    },
  },
});
