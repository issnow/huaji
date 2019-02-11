//选择播放,commit提交多个mutation 
import * as types from './mutation-types';
import { playMode } from 'common/js/config';
import { shuffle } from 'common/js/util';
import {saveSearch, deleteSearch,clearSearch} from 'common/js/cache'

// 选择播放
export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if(state.mode === playMode.random) {
    let randomlist = shuffle(list)
    commit(types.SET_PLAYLIST, randomlist)
    index = randomlist.findIndex(e=>e.id===list[index].id)
  }else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
};

// 随机播放
export const randomPlay = ({commit,state}, {list}) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomlist = shuffle(list)
  commit(types.SET_PLAYLIST, randomlist)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
};

// 插入播放
export const insertSong = ({commit, state}, song) => {
  let playlist = [...state.playlist]
  let sequenceList = [...state.sequenceList]
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = playlist.findIndex(e=>e.id===song.id)
  // 因为是插入歌曲,所以索引+1
  currentIndex++

  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这个歌
  if(fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if(currentIndex > fpIndex) {
      playlist.splice(fpIndex,1)
      currentIndex--
    }else {
      playlist.splice(fpIndex + 1,1)
    }
  }

  let currentSIndex = sequenceList.findIndex(e=>e.id===currentSong.id) + 1
  let fsIndex = sequenceList.findIndex(e=>e.id===song.id)
  sequenceList.splice(currentSIndex, 0, song) 
  if(fsIndex > -1) {
    if(currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    }else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}

// 保存历史到本地中
export const saveSearchHistory = ({commit, state}, query) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
};

// 删除一个历史纪录
export const deleteSearchHistory = ({commit, state}, query)=> {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 删除全部历史记录
export const clearSearchHistory = ({commit})=>{
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
