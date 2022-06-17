import Service from '../http'
const service = new Service()

const CATEGORY_URL = '/api/category'
const SERIES_URL = '/api/category/s'
const SERIES_LIST_URL = '/api/goods/series'

export const fetchAllCategories = () => service.getData(CATEGORY_URL)
export const fetchSeriesByCategoryId = (options: any) =>
  service.getData(`${SERIES_URL}/${options.category_id}`)
export const fetchGoodsBySeriesId = (options: any) =>
  service.postData(`${SERIES_LIST_URL}/${options.series_id}`, options)
