import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';
import axios from './index';

// 获取轮播图
export const getRecommend = () => {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = {
    ...commonParams,
    uin: 0,
    platform: 'h5',
    needNewCode: 1, 
  }
  return jsonp(url, data, options)
};

// 获取歌单
export const getDiscList = () => {
  return axios.get('https://api.bzqll.com/music/tencent/hotSongList?key=579621905&categoryId=10000000&sortId=3&limit=60')
};
// 获取歌单详情(歌单歌曲)
export const getDiscSongs = (id) => {
  return axios.get('https://api.bzqll.com/music/tencent/songList',{
    params: {
      id,
      key:579621905
    }
  })
};

