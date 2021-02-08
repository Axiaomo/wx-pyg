export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
export const showModal = () => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      success(res) {
        resolve(res)
      }, fail(error) {
        reject(error)
      }
    })
  })
}
