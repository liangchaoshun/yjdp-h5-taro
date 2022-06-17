import Service from '../http'
const service = new Service()

const HOME_BANNER = '/api/goods/home/banner'
const HOME_GOODS = '/api/goods/home/products'

export const fetchHomeGoods = (options: any) =>
  service.postData(HOME_GOODS, options)

export const fetchHomeBanner = () => service.getData(HOME_BANNER)
