import { commonParams, options } from '@/util/config'
import jsonp from '@/util/jsonp'
import axios from 'axios'
import {getUid} from '@/util/uid'

export function getLyric (id) {
  let url = '/api/lyric'
  let data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: id,
    g_tk: 1535639072,
    loginUin: 0,
    hostUin: 0,
    outCharset: 'utf-8',
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getVKey (songmid, filename) {
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  })
  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}
