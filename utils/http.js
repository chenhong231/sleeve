import {config} from "../config/config"
import {promisic} from "util"

class Http {
  static async request({url, data, method='GET'}) {
    const res = await promisic(wx.request)({
      url:`${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        appkey: config.appkey
      }
    })
    return res.data
  }
}


//三种常见的异步调用方式
//callback
//promise
//async await

// promisic(wx.request)({
//   url: 
// })

export {
  Http
}