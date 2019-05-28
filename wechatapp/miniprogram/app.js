//app.js
// import Request from './lib/httpServer';
// import Api from './lib/api';
import {
  wechatapplet
} from './lib/api';

App({
  onLaunch: function() {
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       // 发起网络请求
    //       console.log(res)
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      return;
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.setEnableDebug({  //打开调试
      enableDebug: true
    })

    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate){
        console.log("系统存在新版本")
      }
    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });

  },

  /**
   * 所有可分享入口页面，需要在onload事件先调用本方法，例如：
   * onLoad: function(options){
   *   app.login().then(res=>{
   *      // res.data 即为userInfo
   *      ...
   *   });
   * }
   */
  login: function(){
    let that = this;
    return new Promise(function (resolve, reject) {
      if (that.globalData.wechatUserData.wechatApplet){
        resolve(that.globalData.wechatUserData);
        return;
      }
      // 查看是否授权
      wx.cloud.callFunction({
        name: 'getInfo',
      }).then(res=>{
        wechatapplet({
           openid: res.result.userInfo.openId
        }).then(result=>{
            if (result.code == '10000'){
              that.globalData.wechatUserData = result.data;
              //wx.setStorageSync('cookieKey', result.data.token);
              resolve(result.data);
            }else{
              reject(result);
            }
        }).catch(err=>{
          reject(err);
        });
      }).catch(err=>{
        reject(err);
      })
    });
  },


  globalData: {
    Examid:'',
    Itemid:'',
    Uid:'',
    footerType:2,
    wechatUserData:{},  //微信用户信息
    mac:'',
    userInfo: null,
    Subjectid:'',
    commentData:{},
    authCode: '',
    mac: '',     //扫描仪第一次传参
    pixelRatio: '',
    examInfo:{},  //存储考试题块
    smId:'',
  }
})