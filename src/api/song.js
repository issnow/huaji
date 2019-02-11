import axios from "./index";
export const getLyric = (id) => {
  return axios.get('https://api.bzqll.com/music/tencent/lrc',{
    params: {
      id,
      key: 579621905
    }
  })
};
