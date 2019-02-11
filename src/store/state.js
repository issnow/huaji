import { playMode } from 'common/js/config';
import {loadSearch} from 'common/js/cache'
const state = {
  // singer单个歌手
  singer: {},
  // 播放的状态 播放或者暂停
  playing: false,
  // 是否全屏
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 原始列表
  sequenceList: [],
  // 播放模式 顺序/随机播放
  mode: playMode.sequence,
  // 当前播放的索引,通过索引找到歌曲
  currentIndex: -1,
  // recommend歌单
  disc: {},
  // rank排行榜歌单
  toplist: {},
  // 搜索历史，
  searchHistory: loadSearch()
}
export default state