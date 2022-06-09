import { login } from "@/request/api/home";
import { getMusicLyric } from "@/request/api/item";
import { createStore } from "vuex";

export default createStore({
  state: {
    // 播放列表 默认值
    playList: [
      {
        al: {
          id: 80048738,
          name: "二十出头",
          pic: 109951166097645860,
          picUrl:
            "https://p2.music.126.net/NFwP3J0I-mBubFOsfM1UEQ==/109951166097645854.jpg",
          pic_str: "109951166097645854",
        },
        ar: [{ id: 12077204, name: "陈壹千", tns: Array(0), alias: Array(0) }],
        name: "一个",
        id: 1374489910,
      },
    ],
    playListIndex: 0,
    isbtnShow: true, // 播放按钮是否显示
    detailsShow: false, // 歌曲详情展示
    //歌词
    lyricList:{},
    currentTime:0, //当前播放到的毫秒数
    duration:0, // 歌曲总时长
    isLogin:false, // 判断是否登录
    isShowFooter:true, // 是否显示底部
    user:{}, // 用户信息
  },
  getters: {},
  mutations: {
    updatebtnShow(state, value) {
      state.isbtnShow = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
    },
    pushPlayList(state,value){
      state.playList.push(value)
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailsShow(state) {
      state.detailsShow = !state.detailsShow;
    },
    updateLyricList(state,value){
      state.lyricList = value;
    },
    updateCurrentTime(state,value){
      state.currentTime = value;
    },
    updateDuration(state,value){
      state.duration =  value;
    },
    updateUser(state,value){
      state.user = value;
    }
  },
  actions: {
    //axios是异步 所以要写在action
    async getLyric(context,value){
      let res = await getMusicLyric(value)
      context.commit('updateLyricList',res.data.lrc)
    },
    async login(context,value){
      let res = await login(value)
      return res
    }
  },
  modules: {},
});
