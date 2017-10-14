import { commonParams } from '@/util/config'
import axios from 'axios'

export function getSheetList (disstid) {
  let url = '/api/getSheetList'
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
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
