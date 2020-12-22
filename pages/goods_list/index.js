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
    goodsList: []
  },
  // 请求数据
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || '';
    this.QueryParams.query = options.query || '';
    this.getGoodsList();
  },
  // 获取商品数据
  async getGoodsList() {
    const result = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    // 计算总页数
    this.totalPages = Math.ceil(result.total / this.QueryParams.pagesize);
    this.setData({
      // 合并数据 数组拼接
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  // 页面上滑 滚动条触底事件
  onReachBottom: function () {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有数据了',
      })
    } else {
      // 获取目前界面中的个数与总的total对比，如果少，继续加载分页
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }

  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
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