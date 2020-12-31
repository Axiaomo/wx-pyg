import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
  },
  // 商品详情数据
  GoodsDetail: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id)
  },
  // 初始化获取数据
  async getGoodsDetail(id) {
    const result = await request({
      url: '/goods/detail?goods_id=' + id
    });
    this.GoodsDetail = result;
    this.setData({
      goodsDetail: {
        pics: result.pics,
        goods_price: result.goods_price,
        goods_name: result.goods_name,
        // 临时把 .webp 文件名改为 .jpg 做部分机型兼容处理
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
  },
  // 点击轮播图放大预览
  handlePrevewImage(e) {
    const urls = this.GoodsDetail.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      urls,
      current
    })
  }

})