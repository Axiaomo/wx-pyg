import { getSetting, openSetting, chooseAddress, showModal } from "../../untils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {},
    cart: [],
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 获取地址信息
    const addressInfo = wx.getStorageSync('address');
    // 获取购物车信息
    const cart = wx.getStorageSync('cart') || [];
    // 全选 总价格 总数
    this.setData({ addressInfo });
    this.setCart(cart);
  },

  // 获取地址点击事件
  async handleChooseAddress(e) {
    try {
      const res = await getSetting();
      const scopeAdderss = res.authSetting['scope.address'];
      if (scopeAdderss === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },

  // 选中点击事件
  handleItemChange(e) {
    const { id } = e.currentTarget.dataset;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // handleItemChange(e) {
  //   const { id } = e.currentTarget.dataset;//解构函数
  //   let { cart } = this.data;
  //   let index = cart.findIndex(v => v.goods_id === id);
  //   cart[index].checked = !cart[index].checked;
  //   console.log(cart[index].checked);
  //   console.log(!cart[index].checked);
  //   // console.log(this.data);
  //   // console.log(e);
  // },

  /**
   * 计算底部工具栏数据
   * @param {Array} cart 购物车数组
   */
  setCart(cart) {
    let totalPrice = 0, totalNum = 0, allChecked = true;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price,
          totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({ cart, totalPrice, totalNum, allChecked });
    wx.setStorageSync('cart', cart);
  },

  // 全选反选事件
  handleAllChange() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setData({ allChecked });
    this.setCart(cart)
  },

  // // 商品数量加减
  async handleItemNumEdit(e) {
    const { id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    // 获取商品下标
    const index = cart.findIndex(v => v.goods_id === id);
    // 当商品数量为1时再减少则提示是否删除
    if (cart[index].num === 1 && operation === -1) {
      const result = await showModal({ content: '是否要删除此商品？' });
      if (result.confirm) {

        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      // 否则数量更改
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  // 去结算
  handelPay() {
    console.log(this.data);
    const { addressInfo, totalNum } = this.data;
    // 没有收货地址
    if (!addressInfo) {
      wx.showToast({
        title: '还没有添加收货地址',
        icon: 'none'
      });
      return;
    }
    // 没有商品
    if (totalNum === 0) {
      wx.showToast({
        title: '还没有添加商品',
        icon: 'none'
      });
      return;
    }
    // 通过验证
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})