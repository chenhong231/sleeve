
import { Http } from "../utils/http";

class Theme {

  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []
  
  async getThemes() {
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    const themes = await Http.request({
      url: `theme/by/names`,
      data: {
        names
      }
    })
    this.themes = themes
  }

  async getHomeLocationA() {
    return this.themes.find( t => t.name === Theme.locationA)
  }

  async getHomeLocationE() {
    return this.themes.find( t => t.name === Theme.locationE)
  }

  async getHomeLocationF() {
    return this.themes.find( t => t.name === Theme.locationF)
  }

  async getHomeLocationH() {
    return this.themes.find( t => t.name === Theme.locationH)
  }

  async getHomeLocationESpu() {
    return this.getThemeSpuByName(Theme.locationE)
  }

  async getThemeSpuByName(name) {
    const theme = await Http.request({
      url: `theme/name/${name}/with_spu`
    })
    return theme
  }
}

export {
  Theme
}