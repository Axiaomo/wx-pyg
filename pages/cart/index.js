import {
  getSetting,
  openSetting,
  chooseAddress
} from "../../untils/asyncWx";
Page({
  // 页面初始数据
  data: {
    addressInfo: {},
  },
  onShow() {
    const addressInfo = wx.getStorageSync("address");
    this.setData({
      addressInfo
    });
  },
  // 点击收货地址
  async handleChooseAddress() {
    try {
      const res = await getSetting();
      const scopeAdderss = res.authSetting["scope.address"];
      if (scopeAdderss === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo;
      wx.setStorageSync("address", address);
      console.log(address);
    } catch (error) {
      console.log(error);
    }
  },
});