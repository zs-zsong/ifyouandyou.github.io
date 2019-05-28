var app = getApp();
import { 
    UExamStd,
    exportExamDataQuestion, 
    exportExamDataStudent, 
    GetScanTheList,
    GetScanningProgress,
    ConfirmTest,
    AuthCode,
    bindInfos, 
    getSchoolLists,
    getMyinformation,
   updateExamIsDoubAndPage
} from '../../lib/api';
Page({
  data: {
    isb: 0, //是否补扫  1为补扫情况
    tap:4,               //tap 值
    radio:'1',          //单双面
    scanList:[{id:95277}],       //扫描仪列表
    code: '106',         //websoket 命令请求
    examId: '',      //考试id
    examName: '',    //考试名字
    unionCode: '',  //扫描仪id
    xNum: '0',        //学生扫描份数
    kNum: '0',        //空白扫描份数
    dNum: '0',        //答案扫描份数
    // isReady:false,   //扫描仪是否准备就绪  
    isYZ:false,//是否要验证              
    inputValue:'',//验证码
    isunderway: false,//是否在 扫描进行中
    isfinish: false,// 是否完成扫描
    url:'',//websoket地址
    dot: true,//控制扫描仪 点点是否显示
    schoolID:'',
    no_sacn:[],
    arr:'',

    clearStatus: false,
    inputValue: '',
    schoolList: [],
    newInput: ''
  },
  onLoad(v) {
    if (v.isb == 1){
        this.setData({
          isb: v.isb,
          examName: v.examName,
          examId: v.id,
        }); 
        wx.setNavigationBarTitle({
          title: '补扫试卷'
        })
    }else{
      this.getMySchool();
      this.setData({
        examId: v.id,
      }); 
    }
    this.getScanTheList();
  },
  setScanbu(data) {//设置补扫的扫描仪信息
    updateExamIsDoubAndPage(data).then((res)=>{
        console.log(res)
        if(res.code == 10000){
          app.globalData.smId = this.data.arr[0].id;
        }
    })
  },
  // 获取归属学校
  getMySchool() {
    getMyinformation().then((res)=>{
        console.log(res);
        if(res.code = '10000'){
          this.setData({
            inputValue: res.data.school_name||'无归属学校'
          })
        }
    })
  },
  /*点击学校选中*/
  handleClick(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    // this.bindInfo(id);
    this.setData({
      inputValue: name,
      schoolList: [],
      clearStatus: false,
      schoolID:id,
    },()=>{
      this.getScanTheList(id);
    })
  },
  /*清空输入框*/
  removeInput() {
    this.setData({
      inputValue: ''
    })
  },
  // 归属学校input输入
  inputChange(e) {
    var val = e.detail.value;
    if (val == '') {
      var list = [{ school_name: '无归属学校', id: -1 }];
      this.setData({
        schoolList: list
      })
      return
    }
    this.getSchoolList(val);
    this.setData({
      clearStatus: true,
      newInput: val
    })
  },
  // 获取学校
  getSchoolList(val) {
    getSchoolLists({ school: val }).then((res) => {
      if (res.code == 10000) {
        var list = res.data;
        var obj = {
          school_name: '无归属学校',
          id: -1
        }
        list.push(obj);
        this.setData({
          schoolList: list
        })
      }
    })
  },
  
  // 绑定归属学校
  bindInfo(schoolId) {
    bindInfos({ schoolId: schoolId}).then((res) => {
      if (res.code == 10000) {
        console.log(schoolId)
        // this.getScanTheList();
      }
    })
  },
  uExamStd() {//更改考试状态
    UExamStd({
      scene: 1,
      examId: this.data.examId,
    }).then((res)=>{
      console.log(res);
      if (res.code == '10000') {
        console.log(111);
        wx.redirectTo({
          url: '../exam/confirmMsg/confirmMsg?examId=' + this.data.examId
        })
      }
    })
  },
  next(e) {//下一步
    console.log(e.target.dataset.info);
    console.log(this.data.arr);
    let arr = this.data.arr;
    if (this.data.isunderway || this.data.isYZ) return;
    if (e.target.dataset.info == 1 && this.data.schoolID){
      this.bindInfo(this.data.schoolID);
    }
    if (!this.data.isYZ) { //验证后连接
      if (arr[0].online != '准备就绪'){
        wx.showToast({
          icon: 'none', //success / fail / exception / none
          title: arr[0].online,
          duration: 1500
        })  
        return;
      }
      this.connect(this.data.url);
    }
 
    if (arr[0].supportsDuplex != 1){
      this.setData({
        radio:2
      })
    }
    this.setData({
      tap: e.target.dataset.info,
      isunderway:false,
      isfinish:false,
      dot:false,
      scanList:arr
    })
  },
  authCode(code) { //验证扫描仪    
    var schoolID = this.data.schoolID;
    AuthCode({
      code: code,
      schoolId: schoolID,
    }).then((res)=>{
        wx.showToast({
          icon: 'none', //success / fail / exception / none
          title: res.data,
          duration: 1500
        })
      if (res.data == '验证成功') {
          this.setData({
            isYZ: false
          });
          this.getScanTheList();
        }
    })
  },
  scan() {
    wx.scanCode({
      scanType: ['barCode', 'qrCode'],
      success: (res) => {
        console.log('看我宇智波斑')
        var http = decodeURIComponent(res.result);
        var arr = http.split('?');
        var len = http.split('?').length;
        var code = arr[len - 1].split('#')[0].substring(6);
        console.log(code);
        this.authCode(code);
      },
    });
  },
  bindKeyInput(e) {
    console.log(e)
    this.setData({
      inputValue: e.detail.value,
    });
  },
  copy() {
    wx.setClipboardData({
      data: 'https://teacher.yuangaofen.com/client/setup_wx.exe',
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              icon: 'none', //success / fail / exception / none
              title: '复制成功',
              duration: 1500
            })
          }
        })
      }
    })
  },
  // getScanbu() {//获取补扫的扫描仪  补扫
  //   var scanList = [];
  //   var id = app.globalData.smId;
  //   GetScanTheList().then((res) => {
  //     for (var i = 0; i < res.data.length; i++) {
  //       if (id == res.data[0].id){
  //         scanList.push({
  //           url: res.data[i].requestUrl,
  //           name: res.data[i].name,
  //           unionCode: res.data[i].unionCode,
  //           online: res.data[i].online,
  //           supportsDuplex: res.data[i].supportsDuplex,
  //           id: res.data[i].id,
  //         })
  //       }    
  //     }
  //     console.log(scanList)
  //     this.setData({
  //       dot: false,
  //       scanList: scanList,
  //       unionCode: scanList[0]&&scanList[0].unionCode,
  //       arr: scanList,
  //     })
  //     this.connect(scanList[0] &&scanList[0].url);
  //   })
  // },
  getScanTheList() {//获取扫描仪列表
    var scanList = [];
    var schoolID = this.data.schoolID;
    GetScanTheList({schoolId:schoolID}).then((res)=>{
      console.log(res);
      if (res.code == '10000') {
        if (res.data.length <= 0){
          this.setData({
            scanList: scanList,
          })
        }else{
          let brr = [];
          let no_sacn = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].userStatus != 2 && res.data[i].online != '请验证' && res.data[i].type == 1) {
                scanList.push({
                  url: res.data[i].requestUrl,
                  name: res.data[i].name,
                  unionCode: res.data[i].unionCode,
                  online: res.data[i].online,
                  supportsDuplex: res.data[i].supportsDuplex,
                  id: res.data[i].id,
                })
            } else if ((res.data[i].online == '请验证' || res.data[i].online == '已移除') && res.data[i].type == 1) {
                no_sacn.push({
                  name: '未获取授权',
                  url: res.data[i].requestUrl,
                  online: res.data[i].online,
                  unionCode: res.data[i].unionCode,
                })
              }
          }
          brr.push(scanList[0])
          if (no_sacn.length>0){
            scanList.push(no_sacn[0]);
          }
          if (scanList.length >0){
            // this.connect(scanList[0].url);
            this.setData({
              scanList: scanList,
              unionCode: scanList[0].unionCode,
              url: scanList[0].url,
              arr: brr,
              no_sacn: no_sacn
            })
            if (scanList[0] && scanList[0].online == '请验证') {
              console.log('宇智波斑');
              this.setData({
                isYZ: true,
              })
            }
          }else{
            this.setData({
              scanList: scanList,
            })
          }
        }
      }
    })
  },
  start() {//开始扫描
    if (this.data.isunderway) return;
    console.log(1111111);
    var msg = {
      code: this.data.code,
      examId: this.data.examId,
      unionCode: this.data.unionCode,
      testPaperType: this.data.tap == 1 ? 2 : this.data.tap == 2 ? 1 : 3,
      pages: 1,
      doubleIs: this.data.radio == 1 ? true : false
    }
    this.sendSocketMessage(msg)
  },
  end() {//结束扫描
    var data = {
      examId: this.data.examId,
      isDobule: this.data.radio == 1?2:1,
      page:'1',
      smName:'0',
      smUnionCode: this.data.arr[0].id,
      smRequestUrl:'0',
    };
    if (this.data.isunderway) return;

    if(this.data.isb == 1){
      // this.buS();
      wx.redirectTo({
        url: '../grade/grade?examid=' + this.data.examId + '&examName=' + this.data.examName
      })
    }else{
      this.uExamStd();
      this.setScanbu(data);
      // this.confirmTest();
    } 
  },
  onUnload() {
    console.log('页面关闭')
    wx.onSocketClose(()=>{
      console.log('关闭')
    })
  },
  unconnect(url) { //webSocket断开重新链接
    wx.onSocketClose(()=>{
      console.log('断开重新连接')
      wx.connectSocket({
        url: url
      });
    })
  },
  connect(url) {//webSocket链接
    wx.connectSocket({
      url: url
    });
    this.unconnect(url);
  },
  sendSocketMessage(msg) {//发送webSocket链接请求
    wx.sendSocketMessage({
      data: JSON.stringify(msg)
    });
    console.log(msg);

    wx.onSocketMessage((res)=>{
      console.log(res)
      this.SocketMessage(res);
    })
  },
  SocketMessage(res) { //服务器返回消息
    let data = JSON.parse(res.data)
        , code = data.code
        , kNum = parseInt(this.data.kNum)
        , xNum = parseInt(this.data.xNum)
        , dNum = parseInt(this.data.dNum);

    if (code == 203) {//开始扫描
       this.setData({
         isunderway:true
       })
    }

    if (code == 212){//扫描数据
        if(this.data.tap == 1){
          kNum = kNum + 1;
          this.setData({
            kNum: kNum
          })
        } else if (this.data.tap == 2){
          xNum = xNum + 1;
          this.setData({
            xNum: xNum
          })
        }else{
          dNum = dNum + 1;
          this.setData({
            dNum: dNum
          })
        }
    }

    if (code == 214) {//扫描结束
      this.setData({
        isunderway: false
      })
      //解决没扫到数据，而又扫描结束
      if (this.data.tap == 1) {
        if (this.data.kNum <= 0) return;
        this.setData({
          isfinish: true,
        })
      } else if (this.data.tap == 2) {
        if (this.data.xNum <= 0) return;
        this.setData({
          isfinish: true,
        })
      } else {
        if (this.data.dNum <= 0) return;
        this.setData({
          isfinish: true,
        })
      }

    }

    if (code == 226) {//扫描失败
      this.setData({
        isunderway: false
      })
    }

    if (code == 207 || code == 208 || code == 211 || code == 225 || code == 217 ) {
      wx.showToast({
        icon: 'none', //success / fail / exception / none
        title: JSON.parse(res.data).msg,
        duration: 1500
      })
    }
      
  },
  changeScan(v) {//扫描仪切换

    let url = this.data.scanList[v.detail.current].url
      , online = this.data.scanList[v.detail.current].online
      , brr = [];
    brr.push(this.data.scanList[v.detail.current])
    this.setData({
      unionCode: this.data.scanList[v.detail.current].unionCode,
      url:url,
      arr:brr
    });

    if (online == '请验证'){
      this.setData({
        isYZ:true
      })
    }else{
      this.setData({
        isYZ: false
      })
    }
  },
  changeStep(v) {//步骤改变
    console.log(v.detail.current);
    this.setData({
      tap: v.detail.current+1
    })
  },
  changeR(v) {//单双面改变
    console.log(v.currentTarget.dataset.info);
    if (this.data.arr[0].supportsDuplex != 1) return;
    this.setData({
      radio: v.currentTarget.dataset.info
    })
  },
  getScanningProgress() {//获取上传试卷图片
    if(!this.data.isfinish) return;
    GetScanningProgress({
      examId: this.data.examId
    }).then((res)=>{
      console.log(res);
      if (res.code == '10000') {
        let arr = [];
        if (this.data.tap == 1) {
          for (var i = 0; i < res.data.testPaper.testPaperImg.length; i++) {
            arr.push(res.data.testPaper.testPaperImg[i].imgUrl);
          }
          wx.previewImage({
            urls: arr // 需要预览的图片http链接列表
          })
        } else if (this.data.tap == 2) {
          console.log(res.data.student.studentImg)
          for (var i = 0; i < res.data.student.studentImg.length; i++) {
            arr.push(...res.data.student.studentImg[i]);
          }
          console.log(arr)
          wx.previewImage({
            urls: arr.reverse()    // 需要预览的图片http链接列表
          })
        } else {
          for (var i = 0; i < res.data.answer.answerImg.length; i++) {
            arr.push(res.data.answer.answerImg[i].imgUrl);
          }
          wx.previewImage({
            urls: arr // 需要预览的图片http链接列表
          })
        }
      }
    })
  },
  seeImage() {//查看图片
    this.getScanningProgress();
  },
});
