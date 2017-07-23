import { commonParams } from '@/util/config'
import axios from 'axios'

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
