//index.js
const app = getApp()

Page({
  data: {
    todoList:[],//与时间对应的待办列表
    inputValue:"",//添加对应input的值
    currentTime:"",//选择的时间，默认今天
  },
  bindKeyInput: function(e) {//事件绑定-同步input值
    this.setData({
      inputValue: e.detail.value
    })
  },
  onLoad: function () {
    this.commonGetTimer("",this.dbGetTodo);
  },
  dbGetTodo:function(){//公共事件-获取待办
    try {
      const todoList = wx.getStorageSync(`DB-TODOLIST${currentTime}`)
      if (todoList) {
        this.setData({
          "todoList":todoList
        })
      }
    } catch (e) {

    }
  },
  dbAddTodo:function(){//公共事件-事件绑定-添加待办
    const { todoList,currentTime } = this.data;
    const todo = {
      name:`DB-TODO${new Date().getTime()}`,
      value:this.data.inputValue,
    }
    todoList.unshift(todo);
    this.setData({
      "todoList":todoList
    },()=>{
      try {
        wx.setStorageSync(`DB-TODOLIST${currentTime}`, todoList);
      } catch (e) {    
      }
    })
    
  },
  commonGetTimer:function(selData,cb){//公共事件-返回当前时间
    const currentData = selData || new Date();
    let mouth = currentData.getMonth() + 1;
    mouth = mouth < 10 ? `0${mouth}`:mouth;
    let currentTimer = `${currentData.getFullYear()}${mouth}${currentData.getDate()}`;
    this.setData({
      "currentTime":currentTimer
    },cb())
  }
  
})
