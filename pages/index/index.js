import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [], // 轮播图
    catesList: [],//导航数组
    floorList: [],//楼层数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  /* 轮播图 */
  async getSwiperList() {
    let result = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata' });
    this.setData({
      swiperList: result.data.message
    })
  },
  /* 导航 */
  async getCatesList(){
    let result=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"});
    this.setData({
      catesList:result.data.message
    })
  },
  /* 楼层数据 */
  async getFloorList(){
    let result=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"});
    this.setData({
      floorList:result.data.message
    })
  },
})