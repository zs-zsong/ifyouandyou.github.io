




class request {
  constructor() { 
    if (wx.getStorageSync('cookieKey')) {
      this._header = {
        'Cookie': wx.getStorageSync('cookieKey')
      }
    }
    
  }
  /**
   * 显示错误提示
   */
  showError(data,url){
    if (url.indexOf('updateStudentName') != -1) return;// 名字识别。空名字重复问题
    if(data.msg == "未登录"&&url.indexOf('getInfo')==-1) {
      wx.showToast({
        title: data.msg || '网络错误',
        icon: 'none',
        duration: 3000,
        success: () => {
          wx.navigateTo({
            url:'/pages/login/guidePage/guidePage'
          })
        }
      })
    } else if(data.code&&data.code !=10000 && data.msg != "未登录") {
      console.log(JSON.stringify(data))
      if(data.code == 10029){return};
      wx.showToast({
        icon: 'none',
        title: data.msg,
        duration: 3000
      });
    }
  }
  /**
   * GET类型的网络h请求
   */
  get(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  delete(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  put(url, data, header = {'Content-Type': 'application/json;charset=UTF-8'}) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  post(url, data, header) {
    return this.requestAll(url, data, header?header:this._header, 'POST')
  }
  /**
   * POST类型的网络请求
   */
  postOther(url, data, header = {'Content-Type': 'application/json;charset=UTF-8'}) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    if (header && wx.getStorageSync('cookieKey')) header['Cookie'] = wx.getStorageSync('cookieKey');
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        data:data,
        header:header?header:{},
        success: (res)=> {
          // 打印地址和错误返回
          console.group(`接口访问信息`);
            console.log('[url]:', url);
            console.log('[Token]:', res.header['Set-Cookie']);
            console.log('[params]:', data&&JSON.stringify(data));
          console.groupEnd();
          
          if(res.data.code!=10000){
            console.log(`[res]:${res.data.code}`, JSON.stringify(res.data.data));
          }
          //设置cookies
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie']);   //保存Cookie到Storage
          }
          if (res.statusCode==200) {
             this.showError(res.data,url)
              //200: 服务端业务处理正常结束
              resolve(res.data)
          } else {
            wx.showToast({
              icon: 'none',
              title: '网络错误-fail-1',
              duration: 3000
            });
            console.log(data)
            reject(res)
          }
        },
        fail: function(res) {
          console.log('[fail]',url)
          wx.showToast({
            title: '网络错误-fail',
            icon: 'none',
            duration: 3000
          });
          reject(res)
        },
        complete: function(res) {
          // wx.alert({content: 'complete'});
          // wx.hideLoading();
        }
      });
    })
  }
}


export default request;