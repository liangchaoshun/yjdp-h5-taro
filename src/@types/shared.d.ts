export interface LocalErrorMsgType extends Record<string, any> {
  message: string
}

export interface LocalResponseType {
  data: any
  error_code: string
  error_msg: string | LocalErrorMsgType
}

export interface GoodsInfoType {
  banner_url: string[]
  category_id: string
  create_time: string
  deleted: number
  desc_en: string
  desc_url: string[]
  desc_zh: string
  home_banner: boolean
  home_display: boolean
  icon_url: string
  name_en: string
  name_zh: string
  price: number
  series_id: string
  update_time: string
  _id: string
  __v?: number
}
