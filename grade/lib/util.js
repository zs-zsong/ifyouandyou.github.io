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
  }
}

export default util;