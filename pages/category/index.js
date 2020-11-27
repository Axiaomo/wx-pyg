import { request } from "../../request/index.js"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧数据
    leftMenuList: [],
    // 右侧数据
    rightContent: [],
    currentIndex: 0,
    scrollTop:0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates()
  },
  /* 获取数据 */
  async getCates() {
    let result = await request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/categories" });
    this.Cates = result.data.message;
    // 构造左侧大数据菜单
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children.map(v => v);
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 点击左侧切换
  async handleItemTap(e) {
    console.log(e);
    const currentIndex = e.currentTarget.dataset.index;
    let rightContent=this.Cates[currentIndex].children;
    this.setData({
      currentIndex,
      rightContent,
      scrollTop: 0
    })
  }

})