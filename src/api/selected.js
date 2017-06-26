import jsonp from '@/util/jsonp'
import { commonParams, options } from '@/util/config'

// https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
export function getSelected () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
  let data = Object.assign({}, commonParams, {
    tpl: 'v12',
    page: 'other',
    rnd: 8826040522372292,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
