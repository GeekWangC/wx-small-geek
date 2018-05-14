//index.js
const app = getApp()

Page({
  data: {
    todoList:[],//与时间对应的待办列表
    inputValue:"",//添加对应input的值
    currentTime:"",//选择的时间，默认今天
    startX:"",//记录触摸起始位置的X坐标
    delBtnWidth:"150rpx",//删除按钮的宽度
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
      const todoList = wx.getStorageSync(`DB-TODOLIST${this.data.currentTime}`) || [];
      this.setData({
        "todoList":todoList
      })
    } catch (e) {

    }
  },
  dbAddTodo:function(){//公共事件-事件绑定-添加待办
    const { currentTime } = this.data;
    const todoList = wx.getStorageSync(`DB-TODOLIST${currentTime}`) || [];
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
  dbDelTodo:function(e){//公共事件-事件绑定-删除待办
    const todoList = wx.getStorageSync(`DB-TODOLIST${this.data.currentTime}`) || [];
    if(todoList.length > 0){
      todoList.splice(e.target.dataset.index || 0,1);
      console.warn(e.target.dataset.index);
      this.setData({
        todoList:todoList
      },()=>{
        try {
          wx.setStorageSync(`DB-TODOLIST${this.data.currentTime}`, todoList);
        } catch (e) {    
        }
      })
    }else{
      return;
    }

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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const reg=new RegExp("-","g"); //创建正则RegExp对象   
    let time = e.detail.value.replace(reg,""); 
    this.setData({
      currentTime: time
    },()=>{
      this.dbGetTodo();
    })
  },

  touchS:function(e){//手指刚放到屏幕触发
    console.log("touchS"+e);
    if(e.touches.length==1){//判断是否只有一个触摸点
      this.setData({
        startX:e.touches[0].clientX
      });
    }
  },
 
  touchM:function(e){//触摸时触发，手指在屏幕上每移动一次，触发一次
    console.log("touchM:"+e);
    const that = this
    if(e.touches.length==1){
      let moveX = e.touches[0].clientX;//记录触摸点位置的X坐标
      let disX = that.data.startX - moveX;//计算手指起始点的X坐标与当前触摸点的X坐标的差值
      let delBtnWidth = that.data.delBtnWidth;//delBtnWidth 为右侧按钮区域的宽度
      let txtStyle = "";
      if(disX == 0 || disX < 0){//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      }else if(disX > 0 ){//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-"+disX+"px";
        if(disX>=delBtnWidth){//控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-"+delBtnWidth+"px";
        }
      }
      let index = e.currentTarget.dataset.index;//获取手指触摸的是哪一个item
      let list = that.data.todoList;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle; 
      //更新列表的状态
      this.setData({
       todoList:list
      });
    }
  },
  touchE:function(e){
    console.log("touchE"+e);
    const that = this
    if(e.changedTouches.length==1){
      
      let endX = e.changedTouches[0].clientX;//手指移动结束后触摸点位置的X坐标
      let disX = that.data.startX - endX;//触摸开始与结束，手指移动的距离
      let delBtnWidth = that.data.delBtnWidth;
      let txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";//如果距离小于删除按钮的1/2，不显示删除按钮
      let index = e.currentTarget.dataset.index;//获取手指触摸的是哪一项
      let list = that.data.todoList;
      list[index].txtStyle = txtStyle; 
      //更新列表的状态
      that.setData({
       todoList:list
      });
    }
  },
  delAddress:function(e){
    console.log(e)
  }

  
})
