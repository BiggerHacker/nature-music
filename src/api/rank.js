import jsonp from '@/util/jsonp'
import { commonParams, options } from '@/util/config'

export function getToplist () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  let data = Object.assign({}, commonParams, {
    uin: 0,
    outCharset: 'utf-8',
    platform: 'h5',
    _: +new Date()
  })
  return jsonp(url, data, options)
}
