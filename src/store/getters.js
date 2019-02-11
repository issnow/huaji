// 单个歌手
export const singer = state => state.singer
// 播放的状态 播放或者暂停
export const playing = state => state.playing
// 是否全屏
export const fullScreen = state => state.fullScreen
// 播放列表
export const playlist = state => state.playlist
// 原始列表
export const sequenceList = state => state.sequenceList
// 播放模式 顺序/随机播放
export const mode = state => state.mode
// 当前播放的索引,通过索引找到歌曲
export const currentIndex = state => state.currentIndex
// 当前播放歌曲
export const currentSong = state => state.playlist[state.currentIndex] || {}
// 歌单对象
export const disc = state => state.disc
// rank排行榜
export const toplist = state => state.toplist
// 搜索历史
export const searchHistory = state => state.searchHistory

