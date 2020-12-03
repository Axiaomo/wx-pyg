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
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates()
    } else {
      // 过期
      if (Date.now() - Cates.time > 1000 * 60 * 5){
        this.getCates()
      }else{
        // 没有过期
        this.Cates=Cates.data;
        let leftMenuList = this.Cates.map(Cates => Cates.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
        // 查看存储数据是否过期
        this.Cates = Cates.data;
      // 重新渲染
    }
  },
  /* 获取数据 */
  async getCates() {
    let result = await request({ url: "/categories" });
    this.Cates = result;
    // 数据缓存
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
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
    const currentIndex = e.currentTarget.dataset.index;
    let rightContent = this.Cates[currentIndex].children;
    this.setData({
      currentIndex,
      rightContent,
      scrollTop: 0
    })
  }

})