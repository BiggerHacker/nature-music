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

export function getSimSingers (mid, start, num) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg'
  let data = Object.assign({}, commonParams, {
    utf8: 1,
    singer_mid: mid,
    start: start,
    num: num,
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8'
  })
  return jsonp(url, data, options)
}

export function getSingerDetail (mid, begin, num) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  let data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8',
    singermid: mid,
    order: 'listen',
    begin: begin,
    num: num,
    songstatus: 1
  })
  return jsonp(url, data, options)
}
