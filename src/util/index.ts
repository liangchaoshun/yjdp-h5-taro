// 返回查询参数对象
export const getUrlParams = (url: string) => {
  if (!url.length) return null
  const result: Record<string, string> = {}
  const params = url.match(/[^=&?]*=[^=&?]*/g) ?? []
  params.forEach((item: string) => {
    const [key, value] = item.split('=')
    result[key] = value
  })
  return result
}
