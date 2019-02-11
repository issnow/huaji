import storage from 'good-storage';
// localStorage缓存 保存搜索结果
// 保存的名字
const SEARCH_KEY = '__search__'
// 保存的长度
const SEARCH_MAX_LENGTH = 15

function insertArray(arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if(index === 0) {
    return
  }
  if(index > 0) {
    console.log('删了一个')
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if(maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
function deleteFromArray(arr, compare) {
  let index = arr.findIndex(compare)
  if(index > -1) {
    arr.splice(index, 1)
  }
}
// 历史搜索保存到本地缓存
export const saveSearch = (query) => {
  let searches = storage.get(SEARCH_KEY,[])
  insertArray(searches, query, e=>e===query, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY,searches)
  return searches
};
// 获取本地缓存
export const loadSearch = ()=>{
  return storage.get(SEARCH_KEY, [])
}
// 删除一个本地缓存
export const deleteSearch = (query)=> {
  let searches = storage.get(SEARCH_KEY,[])
  deleteFromArray(searches, item=>item===query)
  storage.set(SEARCH_KEY,searches)
  return searches
}

// 删除全部历史记录
export const clearSearch=()=> {
  storage.remove(SEARCH_KEY)
  return []
}