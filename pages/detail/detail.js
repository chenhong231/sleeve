import { Spu } from "../../model/spu"
import { ShoppingWay } from "../../core/enum"
import { SaleExplain } from "../../model/sale-explain"
import { getWindowHeightRpx } from "../../utils/system"
import { Cart } from "../../model/cart"
import { CartItem } from "../../model/cart-item"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false,
    cartItemCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)

    const explain = await SaleExplain.getFixed()
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100

    this.setData({
      spu,
      explain,
      h
    })

    this.updateCartItemCount()
  },

  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    })
  },

  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },

  onGotoHome(event) {
    wx.switchTab({
      url: 'pages/home/home',
    })
  },

  onGotoCart(event) {
    wx.switchTab({
      url: 'url',
    })
  },

  onSpecChange(event) {
    this.setData({
      specs: event.detail
    })
  },

  onShopping(event) {
    const chosenSku = event.detail.sku
    const skuCount = event.detail.skuCount

    if(event.detail.orderWay === ShoppingWay.CART) {
      const cart = new Cart()
      const cartItem = new CartItem(chosenSku, skuCount)
      cart.addItem(cartItem)
      this.updateCartItemCount()
    }
  },

  updateCartItemCount() {
    const cart = new Cart()
    this.setData({
      cartItemCount: cart.getCartItemCount(),
      showRealm: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})