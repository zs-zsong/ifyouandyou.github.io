import { getExamlist, updateExamStatus} from '../../lib/api';
var app = getApp();
Component({
  properties: {
    type: {
      type: Number,
      value: '',
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        if (newVal==2){
          this.huoList();
        }
      }
    }
  },
  data: {
    tap:1,
    isDel:false,
    isShow:false,
    isRecover:false,
    jData:'',
    oData:'',
    dId:'',
    jId:'',
    isYZ:false,
    brr:'',
    sacnD:'',
    showBind:false,
    examId:'',
  },
  pageLifetimes: {
    show() {
      this.huoList();
    },
  },
  methods:{
    goChuang(v) {
      console.log(v.currentTarget.dataset.info.status);
      console.log(v.currentTarget.dataset);
      app.globalData.smId = v.currentTarget.dataset.info.sm_unioncode;//补扫扫描仪ID
      this.setData({
        examId: v.currentTarget.dataset.info.examId,
      })
      if (v.currentTarget.dataset.info.status == 4) {//已上传
        wx.navigateTo({
          url: '../exam/confirmMsg/confirmMsg?examId=' + v.currentTarget.dataset.info.examId
        })
      }

      if (v.currentTarget.dataset.info.status == 5) {//评卷中
        wx.navigateTo({
          url: `../grade/grade?examid=${v.currentTarget.dataset.info.examId}&examName=${v.currentTarget.dataset.info.exam_name}`
        })
      }

      if (v.currentTarget.dataset.info.status == 7) {//已完成
        // console.log(app.globalData.wechatUserData.userPhone);
        if (!app.globalData.wechatUserData.userPhone){
          this.setData({
            showBind: true
          })
        }else{
          // wx.navigateTo({
          //   url: '../gradePreview/gradePreview?id=' + v.currentTarget.dataset.info.examId
          // })
          // wx.navigateTo({
          //   url: `/pages/score/scoreAnalyze/scoreAnalyze?type=1&examId=${v.currentTarget.dataset.info.examId}`
          // })
        
          this.setData({
            type: 1
          }, () => {
            this.triggerEvent('myevent', {
              type: 1
            });
          });
        }
      }

    },
    onMyEvent(e) {
      console.log(e.detail.phone)
      this.setData({
        showBind: false
      },()=>{
        
        this.setData({
          type: 1
        }, () => {
          this.triggerEvent('myevent', {
            type: 1
          });
        });
      });
      app.globalData.wechatUserData.userPhone = e.detail.phone;
    },
    huoList() {
      console.log(app.globalData.wechatUserData);
      getExamlist().then((res) => {
        if (res.code == '10000') {
          console.log(res.data)
          let jdata = [];
          let odata = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].status == 2) {
              odata.push(res.data[i]);
            }
            if (res.data[i].status == 4 || res.data[i].status == 5 || res.data[i].status == 7) {
              jdata.push(res.data[i]);
            }
          }
          this.setData({
            jData: jdata,
            oData: odata
          })
        }
      })
    },
    changeTap(v) {
      console.log(v);
      if (this.data.tap == v.target.dataset.info) return;
      this.setData({
        tap: v.target.dataset.info,
        isShow: false
      })
    },
    show() {
      this.setData({
        isShow: !this.data.isShow
      });
    },
    recover() {
      this.setData({
        isRecover: !this.data.isRecover,
        isShow: !this.data.isShow
      });
    },
    del() {
      this.setData({
        isDel: !this.data.isDel,
        isShow: !this.data.isShow,
      });
    },
    onChange1(e) {
      console.log(e.detail.value.join(','));
      this.setData({
        JId: e.detail.value.join(',')
      });
    },
    onChange(e) {
      console.log(e.detail.value.join(','));
      this.setData({
        dId: e.detail.value.join(',')
      });
    },
    abolish() {
      this.setData({
        isShow: false
      })
    },
    confirm() {
      var Data = {};
      if (this.data.tap == 1) {
        Data = {
          status: 2,
          examIdArray: this.data.JId,
        }
        if (!this.data.JId) return;
        this.xiuG(Data);
        return;
      }
      if (this.data.tap != 1) {
        if (this.data.isDel) {
          Data = {
            status: 1,
            examIdArray: this.data.dId,
          }
          if (!this.data.dId) return;
          this.xiuG(Data);
          this.setData({
               isDel: !this.data.isDel,
          })
          return;
        }
        if (this.data.isRecover) {
          if (!this.data.dId) return;
          let arrId = this.data.dId.split(',');
          let brr = [];
          for (var j = 0; j < arrId.length; j++) {
            for (var i = 0; i < this.data.oData.length; i++) {
              if (this.data.oData[i].examId == arrId[j]) {
                brr.push(this.data.oData[i].old_status)
              }
            }
          }
          console.log(brr);
          for (var i = 0; i < arrId.length; i++) {
            this.xiuG({
              status: brr[i],
              examIdArray: arrId[i],
            })
          }
          this.setData({
            isRecover: !this.data.isRecover,
          })
        }
      }
    },
    xiuG(Data) {
      console.log(Data);
      updateExamStatus(Data).then((res) => {
        console.log(res);
        if (res.code == '10000') {
          this.huoList();
          this.setData({
            isShow: false,
            dId:'',
            JId:'',
          });
        }
      }) 
    },
  },

});
