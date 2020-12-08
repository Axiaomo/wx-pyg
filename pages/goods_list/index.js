import {
  request
} from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 请求数据
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getGoodsList();
  },
  // 获取商品数据
  async getGoodsList() {
    const result = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    this.setData({"goodsList":result.goods})
    console.log(result)
  },
  // 子父传值                                                                                                      
  handleTabsItemChange(e) {
    // 1.获取呗点击的标题索引
    const {
      index
    } = e.detail;
    // 2.修改数据源
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
      // 3.重新复制到数据源中
      this.setData({
        tabs
      })
    })
  }
})