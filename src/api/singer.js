// commonParams: {
//   g_tk: 5381,
//   format: 'jsonp',
//   inCharset: 'utf-8',
//   outCharset: 'utf-8',
//   notice: 0
// }
import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';

// 获取歌手列表
export const getSingerList = () => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
};

// 获取歌手详情(包含100条歌曲数据)
export const getSingerDetail = id => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = {
    ...commonParams,
    loginUin: 0,
    hostUin: 0,
    playfrom: 'yqq.json',
    needNewCode: 0,
    ct: 24,
    singermid: id,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  }
  return jsonp(url, data, options)
};