let util = {
  throttle : function(handler, wait) {
    var lastTime = 0;
    return function () {
      var nowTime = +new Date();
      if (nowTime - lastTime > wait) {
        handler.apply(this, arguments);
        lastTime = nowTime;
      }
    }
  },
  getDate() {
    let date = new Date();
    let mon = date.getMonth() + 1;
    if (mon <= 9) {
      mon = "0" + mon;
    }
    let day = date.getDate();
    if (day <= 9) { 
      day = "0" + day;
    }
    return date.getFullYear() + "-" + mon + "-" + day;
  }
}

export default util;