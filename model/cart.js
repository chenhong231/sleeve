class Cart {
  static SKU_MIN_COUNT = 1
  static SKU_MAX_COUNT = 77
  static CART_ITEM_MAX_COUNT = 77

  static STORAGE_KEY = 'cart'

  _cartData = null

  constructor() {
    if(typeof Cart.instance === 'object') {
      return Cart.instance
    }

    Cart.instance = this
    return this
  }

  getAllCartItemFromLocal() {
    return this._getCartData()
  }

  isEmpty() {
    const cartData = this._getCartData()
    return cartData.items.length === 0
  }

  addItem(newItem) {
    if(this.beyondMaxCartItemCount()) {
      throw new Error('超过购物车最大数量')
    }

    this._pushItem(newItem)
    this._refreshStorage()
  }

  getCartItemCount() {
    return this._getCartData().items.length
  }

  _removeItem(skuId) {
    const oldItemIndex = this._findEqaulItemIndex(skuId)
    const cartData = this._getCartData()
    cartData.items.splice(oldItemIndex, 1)
    this._refreshStorage()
  }

  _findEqaulItemIndex(skuId) {
    const cartData = this._getCartData()
    return cartData.items.findIndex( item => {
      return item.skuId === skuId
    })
  }

  _refreshStorage() {
    wx.setStorageSync(Cart.STORAGE_KEY, this._cartData)
  }

  _pushItem(newItem) {
    const cartData = this._getCartData()

    const oldItem = this.findEqualItem(newItem.skuId)
    if(!oldItem) {
      cartData.items.unshift(newItem)
    } else {
      this._combineItems(oldItem, newItem)
    }
  }

  _combineItems(oldItem, newItem) {
    this._plusCount(oldItem, newItem.count)
  }

  _plusCount(item, count) {
    item.count += count
    if(item.count >= Cart.SKU_MAX_COUNT) {
      item.count = Cart.SKU_MAX_COUNT
    }
  }

  findEqualItem(skuId) {
    let oldItem = null
    const items = this._getCartData().items
    for(let i = 0; i < items.length; i++) {
      if(this._isEqualItem(items[i], skuId)) {
        oldItem = items[i]
        break
      }
    }
    return oldItem
  }

  _isEqualItem(oldItem, skuId) {
    return oldItem.skuId === skuId
  }

  _getCartData() {
    if(this._cartData !== null) {
      return this._cartData
    }

    let cartData = wx.getStorageSync(Cart.STORAGE_KEY);
    if(!cartData) {
      cartData = this._initCartDataStorage()
    }

    this._cartData = cartData
    return cartData

  }

  _initCartDataStorage() {
    const cartData = {
      items: []
    }

    wx.setStorageSync(Cart.STORAGE_KEY, cartData)
    return cartData
  }

  beyondMaxCartItemCount() {
    const cartData = this._getCartData()
    return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT
  }
}

export {
  Cart
}