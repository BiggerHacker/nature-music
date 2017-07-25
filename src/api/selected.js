import jsonp from '@/util/jsonp'
import { commonParams, options } from '@/util/config'

export function getSelected () {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
  let data = Object.assign({}, commonParams, {
    tpl: 'v12',
    page: 'other',
    rnd: 8826040522372292,
    loginUin: 0,
    hostUin: 0
  })
  return jsonp(url, data, options)
}

export function getAlbum (page, pageSize, language) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/album_library'
  let data = Object.assign({}, commonParams, {
    outCharset: 'utf-8',
    loginUin: 0,
    hostUin: 0,
    cmd: 'get_album_info',
    page: page,
    pagesize: pageSize,
    sort: 1,
    language: language,
    genre: 0,
    year: 1,
    pay: 0,
    type: -1,
    company: -1
  })
  return jsonp(url, data, options)
}

export function getAlbumSing (mid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg'
  let data = Object.assign({}, commonParams, {
    albummid: mid,
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8'
  })
  return jsonp(url, data, options)
}
