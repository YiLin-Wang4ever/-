<template>
  <div class="Details">
    <!-- 背景图片 -->
    <img class="bg-url" :src="this.Popdetails.al.picUrl" alt />
    <div class="header">
      <div class="header-left">
        <svg class="icon" aria-hidden="true" @click="backDetails">
          <use xlink:href="#icon-zuojiantou" />
        </svg>
        <div class="songname">
          <Vue3Marquee v-if="runHorse">{{this.Popdetails.name}}</Vue3Marquee>
          <div class="namebox" v-else>{{this.Popdetails.name}}</div>
          <div class="createrbox">
            <span
              class="creator"
              v-for="(cname,i) in this.Popdetails.ar"
              :key="i"
            >{{subCreatorName(cname.name)}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow-right" />
            </svg>
          </div>
        </div>
      </div>
      <div class="header-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang" />
        </svg>
      </div>
    </div>
    <div v-show="!isShow" class="middle">
      <img
        class="music-needle"
        src="../../assets/cizhen.png"
        alt
        :class="{music_needle_active:!isbtnShow}"
      />
      <div class="music-box" @click="toggle_lyric">
        <img
          class="music-img"
          :src="this.Popdetails.al.picUrl"
          alt
          :class="{music_dis_paused:isbtnShow,music_dis_running:!isbtnShow}"
        />
      </div>
    </div>
    <div v-show="isShow" class="lyricBox" ref="lyricbox" @click="toggle_lyric">
      <!-- 歌词的话 我们使用p标签进行换行 -->
      <p
        v-for="(item,index) in this.lyric"
        :key="index"
        :class="{now_music_word:(currentTime*1000 >= item.time && currentTime*1000 <= item.pre )}"
      >{{item.lyric}}</p>
    </div>
    <div class="footer">
      <div class="footer-top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changge" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jianyi" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang" />
        </svg>
      </div>
      <div class="footer-mid">
        <input type="range" class="music_bar" min="0" :max="duration" v-model="currentTime" step="0.05" >
      </div>
      <div class="footer-bottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan" />
        </svg>
        <svg class="icon" aria-hidden="true" @click="lastSong">
          <use xlink:href="#icon-shangyishoushangyige" />
        </svg>
        <svg class="icon-play" v-if="isbtnShow" aria-hidden="true" @click="isPlay">
          <use xlink:href="#icon-bofang" />
        </svg>
        <svg class="icon-pause" v-else aria-hidden="true" @click="isPlay">
          <use xlink:href="#icon-zanting" />
        </svg>
        <svg class="icon" aria-hidden="true" @click="nextSong">
          <use xlink:href="#icon-xiayigexiayishou" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gf-playlist" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { Vue3Marquee } from "vue3-marquee";
import { $emit } from 'vue-happy-bus'
import "vue3-marquee/dist/style.css";
export default {
  name: "PopupDetails",
  data() {
    return {
      isShow: false,
      runHorse: "",
    };
  },
  props: ["Popdetails", "isbtnShow", "isPlay","index","addDuration"],
  components: {
    Vue3Marquee
  },
  methods: {
    ...mapMutations(["updatebtnShow", "updateDetailsShow","updatePlayListIndex"]),
    // 上一首
    lastSong(){
      // 当触发点击事件时 下标-1
      if(this.index == 0){
        this.updatePlayListIndex(this.playList.length-1);  
      }else{
        this.updatePlayListIndex(this.index-1);
      }
      
    },
    // 下一首
    nextSong(){
      if(this.index == this.playList.length-1){
        this.updatePlayListIndex(0);
      }else{
        // 当触发点击事件时 下标+1
      this.updatePlayListIndex(this.index+1);
      }
    },
    // 使用 $emit 给父组件传歌词盒子的dom元素
    formatScroll(){
      $emit('formatScroll',this.$refs.lyricbox);
    },
    // 判断作者名字长短
    subCreatorName(name) {
      if (name.length > 6) {
        name = name.substr(0, 6) + "...";
        return name;
      } else {
        return name;
      }
    },
    // 磁盘与歌词的切换
    toggle_lyric() {
      this.isShow = !this.isShow;
    },
    // 回到列表页
    backDetails() {
      this.isShow = false;
      this.updateDetailsShow();
    }
  },
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "detailsShow",
      "lyricList",
      "currentTime",
      "duration"
    ]),
    // 歌词部分  分割歌词
    lyric() {
      let arr;
      // 防止没有拿到值就开始获取
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/\n/).map(el => {
          let minutes = el.slice(1, 3);
          let second = el.slice(4, 6);
          let millisecond = el.slice(7, 10);
          let lyric = el.slice(11, el.length);
          let time =
            parseInt(minutes) * 60 * 1000 +
            parseInt(second) * 1000 +
            parseInt(millisecond);
          if (isNaN(Number(millisecond))) {
            millisecond = el.slice(7, 9);
            lyric = el.slice(10, el.length);
          }
          return { minutes, second, millisecond, lyric, time }; //  左边是右边的缩写 == {minutes:minutes,second:second,millisecond:millisecond,lyric:lyric}
        });
        arr.forEach((item, index) => {
          if (index === arr.length - 1 || isNaN(arr[index+1].time)) {
            item.pre = 1000000;
          } else {
            item.pre = arr[index + 1].time;
          }
        });
      }
      return arr;
    }
  },
  watch: {
    //用watch监听 currentTime 来实现歌词凸显还有切换歌滚轮回滚
    currentTime() {
      let p = document.querySelector(".now_music_word");
      // 先判断p标签的dom元素是不是为空 如果不是为空的话 在进行对凸显歌词的距离判断
      if (p != null) {
        if (p.offsetTop > 241) {
          this.$refs.lyricbox.scrollTop = p.offsetTop - 241;
        }
      }
      // 如果audio音乐的时间突然变为0的时候 就把歌词滚动条回到顶部
      if(this.currentTime == 0){
         this.$refs.lyricbox.scrollTop = 0;
      }
    },
  }, 
  mounted() {
    // 判断歌词长度来是否显示跑马灯
    if (this.Popdetails.name.length > 8) {
      this.runHorse = true;
    }
    this.formatScroll();
  },
  updated(){
    this.addDuration();
  }
  
};
</script>

<style lang="less" scoped>
@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.Details {
  width: 100%;
  height: 100%;
  position: relative;
  .bg-url {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: -1;
    filter: blur(50px);
  }
  .header {
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    fill: white;
    z-index: 4;
    .header-left {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .songname {
        width: 75%;
        height: 100%;
        color: white;
        .namebox {
          text-align: center;
        }
        .createrbox {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
          height: 0.3rem;
          line-height: 0.3rem;
          .creator {
            font-size: 0.26rem;
            // width: 1rem;
            // height: 0.3rem;
            // line-height: 0.3rem;
            // display: inline-block;
            margin-right: 0.1rem;
          }
          .icon {
            width: 0.25rem;
            height: 0.25rem;
            line-height: 0.25rem;
            margin-top: 0.03rem;
            fill: grey;
          }
        }
      }
    }
    .header-right {
      width: 23%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .middle {
    width: 100%;
    height: 8.5rem;
    display: flex;
    justify-content: center;
    position: relative;
    //播放前磁针样式
    .music-needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      top: -3%;
      left: 47%;
      z-index: 3;
      transform-origin: 0 0;
      transform: rotate(-11deg);
      transition: all 1.5s;
    }
    // 播放后的磁针样式
    .music_needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      top: -3%;
      left: 47%;
      z-index: 3;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 1.5s;
    }
    .music-box {
      width: 5rem;
      background-image: url(../../assets/disc-plus.png);
      background-size: 100%;
      position: relative;
      height: 5rem;
      z-index: 2;
      margin-top: 1.4rem;
      .music-img {
        width: 3.2rem;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        animation: circle 20s linear infinite;
        z-index: 1;
      }
      .music_dis_paused {
        animation-play-state: paused;
      }
      .music_dis_running {
        animation-play-state: running;
      }
    }
  }
  .lyricBox {
    width: 100%;
    height: 7.5rem;
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    align-items: center;
    overflow: scroll;
    // overflow: hidden;
    // scroll-behavior: smooth;
    p {
      color: rgb(91, 86, 86);
      margin-bottom: 0.3rem;
      text-align: center;
    }
    .now_music_word {
      color: white;
      font-size: 0.5rem;
      text-align: center;
    }
  }
  .footer {
    width: 100%;
    height: 4rem;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .footer-top {
      width: 100%;
      display: flex;
      height: 1rem;
      padding: 0 0.5rem;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: white;
      }
    }
    .footer-mid {
      width: 100%;
      height: 1.5rem;
      display: flex;
      align-items: center;
      .music_bar {
        width: 100%;
        height: .1rem;
      }
    }
    .footer-bottom {
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .icon-play {
        width: 1.2rem;
        height: 1.2rem;
      }
      .icon-pause {
        width: 1.2rem;
        height: 1.2rem;
      }
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
}
</style>