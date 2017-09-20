import jsonp from '@/util/jsonp'
import { commonParams, options } from '@/util/config'

export function getSingerAlbums (mid, begin, num) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg'
  let data = Object.assign({}, commonParams, {
    singermid: mid,
    order: 'time',
    begin: begin,
    num: num,
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8'
  })
  return jsonp(url, data, options)
}

export function getAlbumDetail (mid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/musicmall.fcg'
  let data = Object.assign({}, commonParams, {
    cmd: 'get_album_buy_page',
    albumid: mid,
    p: Math.random(),
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8'
  })
  return jsonp(url, data, options)
}
