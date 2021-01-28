import { request } from "../../request/index.js";
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
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  // 初始化获取数据
  async getGoodsDetail(id) {
    const result = await request({
      url: "/goods/detail?goods_id=" + id,
    });
    this.GoodsDetail = result;
    this.setData({
      goodsDetail: {
        pics: result.pics,
        goods_price: result.goods_price,
        goods_name: result.goods_name,
        // 临时把 .webp 文件名改为 .jpg 做部分机型兼容处理
        goods_introduce: result.goods_introduce.replace(/\.webp/g, ".jpg"),
      },
    });
  },
  // 点击轮播图放大预览
  handlePrevewImage(e) {
    const urls = this.GoodsDetail.pics.map((v) => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      urls,
      current,
    });
  },
  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    console.log(cart);
    // 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex((v) => v.goods_id === this.GoodsDetail.goods_id);
    console.log(index);
    if (index === -1) {
      // 不存在 第一次加入
      this.GoodsDetail.num = 1;
      this.GoodsDetail.checked = true;
      cart.push(this.GoodsDetail);
    } else {
      // 已存在 数量++
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    console.log(cart);
    wx.showToast({
      title: "添加成功",
      icon: "success",
      mask: true, // 防止用户手抖
    });
  },
});
