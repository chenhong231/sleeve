import { Matrix } from "./matrix"
import { Fence } from "./fence"

class FenceGroup {
  spu
  skuList = []
  fences = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  getDefaultSku() {
    const defaultSkuId = this.spu.default_sku_id

    if(!defaultSkuId) {
      return
    }

    const newSku = this.skuList.find(s => s.id === defaultSkuId)
    return newSku
  }

  getSku(skuCode) {
    const fullSkuCode = this.spu.id + '$' + skuCode
    
    const sku = this.spu.sku_list.find(s=> s.code === fullSkuCode)
    return sku?sku:null
  }

  setCellStatusById(cellId, status) {
    this.eachCell((cell) => {
      if(cell.id === cellId) {
        cell.status = status
      }
    })
  }

  setCellStatusByXY(x, y, status) {
    this.fences[x].cells[y].status = status
  }

  initFences1() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    let currentJ = -1
    matrix.each((element, i, j) => {
      if(currentJ !== j) {
        //开启一个新列，需要创建一个新的Fence
        currentJ = j
        fences[currentJ] = this._createFence(element)
      }
      fences[currentJ].pushValueTitle(element.value)
    })
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const AT = matrix.transpose()
    AT.forEach( r => {
      const fence = new Fence(r)
      fence.init()
      if(this._hasSketchFence() && this._isSketchFence(fence.id)) {
        fence.setFenceSketch(this.skuList)
      }

      fences.push(fence)
    })
    this.fences = fences
  }

  _hasSketchFence() {
    return this.spu.sketch_spec_id?true:false
  }

  _isSketchFence(fenceId) {
    return this.spu.sketch_spec_id === fenceId
  }

  eachCell(cb) {
    for(let i = 0; i < this.fences.length; i++) {
      for(let j = 0; j < this.fences[i].cells.length; j++) {
        const cell = this.fences[i].cells[j]
        cb(cell, i , j)
      }
    }
  }

  _createFence(element) {
    const fence = new Fence()
    return fence
  }

  _createMatrix(skuList) {
    const m = []
    skuList.forEach(sku => {
      m.push(sku.specs)
    })

    return new Matrix(m)
  }
}

export {
  FenceGroup
}