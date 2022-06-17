import Service from '../http'
const service = new Service()

const DETAIL_URL = '/api/goods/detail'

export const fetchGoddsDetail = (options: any) =>
  service.getData(`${DETAIL_URL}/${options.id}`)
