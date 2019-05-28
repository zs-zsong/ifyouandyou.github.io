import { 
  bindScanThe,
  sanqr,
  getSchoolList,
  courseOauth
} from '../../../lib/api';
const app = getApp();
let timer, flag = true;
Page({
  data: {
    showInfo:false,
    showScanner:false,
    number:'',
    unionCode:'',
    innerHeight:'',
    showSearch:false,
    schoolList:'',
    school:'',
  },
  onLoad(query){
    if (query.mac.indexOf("pc-dengchao")!=-1) {
      wx.reLaunch({
        url: '/pages/home/home',
      });
      return
    } else if (query.mac.indexOf("dengchao") != -1) {

      let code = query.mac.replace('dengchao', '')
      console.log(code);
      courseOauth({
        examId: '',
        code: code
      }).then(res => {
        console.log(res);
        if(res.code!=10000) {
          return
        }
        this.setData({
          showInfo: true
        })
      })
      return
    }
    this.setData({
      showScanner:true,
      unionCode:query.mac
    });
    this.getStatus(query.mac)
  },
  bindKeyBlur() {
    this.setData({
      inputType: 0
    });
  },
  getStatus(code){
    sanqr({
      code: code
    }).then((res) => {
      if (res.code == 10008) {
        wx.showToast({
          icon: 'none', //success / fail / exception / none
          title: '扫描端已命名',
          duration: 3000,
          success: () => {
            // console.log('start')
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/home/home',
              })
            }, 3000);
          }
        });
      } 
      
    })
  },
  searchSchoolData(data) {
    if (data) {
      getSchoolList(data).then((res) => {
        console.log(res)
        res.data.push({
          school_name: '无归属学校',
          id: '-1'
        })
        if (res.code == 10000) {
          this.setData({
            showSearch: false,
            schoolList: res.data
          })
        }
      })
    }
  },
  setThird() {
    this.setData({
      // showSearch:false,
      inputType: 3
    });
  },
  searchSchool(el) {
    this.setData({
      showSearch: false,
      school: el.detail.value
    });
    if (flag) {
      this.searchSchoolData(el.detail.value);
      flag = false;
    }
    timer && clearInterval(timer);
    timer = setTimeout(() => {
      this.searchSchoolData(el.detail.value);
      flag = true;
    }, 1000)
  },
  clearSchool(){
    this.setData({
      showSearch: true,
      school: '',
      schoolId: ''
    })
  },
  checkItem(el) {
    this.setData({
      showSearch: true,
      school: el.currentTarget.dataset.info.school_name,
      schoolId: el.currentTarget.dataset.info.id
    })
  },
  bindKeyBlur() {
    this.setData({
      inputType: 0
    });
  },
  cancle(){
    dd.navigateBack({
      deltwx: 1
    })
  },
  bindNumber(){
    if (!this.data.number) {
      wx.showToast({
        icon: 'none', //success / fail / exception / none
        title: '扫描仪名称不能为空',
        duration: 3000
      });
      return;
    }
    if (!this.data.schoolId) {
      wx.showToast({
        icon: 'none', //success / fail / exception / none
        title: '归属学校不能为空',
        duration: 3000
      });
      return;
    }
    let params = {
      unionCode: this.data.unionCode,
      type:'',
      name:this.data.number
    }
    bindScanThe(params).then((res)=>{
      if (res.code!=10000) {
        wx.showToast({
          icon: 'none', //success / fail / exception / none
          title: res.msg,
          duration: 3000,
          success:()=>{
            // console.log('start')
            setTimeout(()=>{
              wx.reLaunch({
                url: '/pages/home/home',
              })
            },3000);
          }
        });
      } else {
        wx.showToast({
          icon: 'success', //success / fail / exception / none
          title: '绑定成功',
          duration: 3000,
          success:()=>{
            wx.reLaunch({
              url: '/pages/home/home',
            })
          }
        });
      }
    })
  },
  bindKeyInput(el){
    this.setData({
      number:el.detail.value
    });
  }
});
