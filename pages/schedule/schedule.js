//index.js
const app = getApp()

Page({
  data: {
    scheduleList:[],//与时间对应的日程
    currentTime:"",//选择的时间，默认今天
  },
  bindKeyInput: function(e) {//事件绑定-同步input值
    this.setData({
      inputValue: e.detail.value
    })
  },
  onLoad: function () {
    this.commonGetTimer("",this.setTimeList);
  },
  commonGetTimer:function(selData,cb){//公共事件-返回当前时间
    const currentData = selData || new Date();
    let mouth = currentData.getMonth() + 1;
    mouth = mouth < 10 ? `0${mouth}`:mouth;
    let currentTimer = `${currentData.getFullYear()}${mouth}${currentData.getDate()}`;
    this.setData({
      "currentTime":currentTimer
    },()=>{
      cb()
    })
  },

  bindDateChange: function(e) {//事件绑定-选择日期
    const reg=new RegExp("-","g"); //创建正则RegExp对象   
    let time = e.detail.value.replace(reg,""); 
    this.setData({
      currentTime: time
    },()=>{
      this.dbGetTodo();
    })
  },
    
  setTimeList: function(sTime,eTime,intervalTime){// 通用方法，设置时间段
    /**
     * sTime 开始时间 默认 05:00；
     * eTime 结束时间 默认 22:00； 
     * intervalTime 时间间隔 默认 1小时
     */
    const { currentTime } = this.data;
    let tempTime = sTime || 500;
    let tempTimeList = [];
    while(tempTime <= (eTime || 2200)){
      let showTempTime = tempTime < 1000 ? `0${tempTime}` : `${tempTime}`;
      showTempTime = `${showTempTime.substr(0,2)}:${showTempTime.substr(-2)}`;
      let tempTimeSingle = {
        key:`DB-SCHEDULE${new Date().getTime()}${tempTime}`,
        name:showTempTime,
        value:`缺失有点儿难${tempTime}`
      }
      tempTimeList.push(tempTimeSingle);
      tempTime += (intervalTime || 100);
    }

    this.setData({
      "scheduleList":tempTimeList
    },()=>{
      try {
        wx.setStorageSync(`DB-SCHEDULELIST${currentTime}`, todoList);
      } catch (e) {    
      }
    })  
  }

})
