//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    url:"http://geekwangc.com/source/image/image-text/1.png"
  },
  onLoad: function () {
    setInterval( ()=> {
      this.setLOVER();
    }, 1500);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  setLOVER:function(){
    let type = "get";
    let index = Math.floor(Math.random()*90)+1;
    let ix = index == 74 ? 75 : index;
    let url = "http://geekwangc.com/source/image/image-text/"+ix+".png";
    this.setData({
      url:url
    })
  }
})
