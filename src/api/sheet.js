import jsonp from '@/util/jsonp'
import { commonParams, options } from '@/util/config'

export function getSheetList (disstid) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  let data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: disstid,
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8'
  })
  return jsonp(url, data, options)
}
