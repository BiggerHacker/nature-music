import jsonp from '@/util/jsonp'
import { commonParams, options } from '@/util/config'

export function getSingers (pagenum, pagesize) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: pagesize,
    pagenum: pagenum,
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8'
  })
  return jsonp(url, data, options)
}
