<template>
  <div class="footermusic">
    <div class="footer-left" @click="updateDetailsShow">
      <img :src="playList[playListIndex].al.picUrl" alt />
      <div class="song-name">
        <p>{{playList[playListIndex].name}}</p>
        <div class="creatorbox">
            <span class="creator" v-for="(cname,i) in playList[playListIndex].ar" :key="i">{{subCreatorName(cname.name)}}</span>
        </div>
      </div>
    </div>
    <div class="footer-right">
      <!-- 播放按钮 -->
      <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="isPlay">
        <use xlink:href="#icon-24gl-playCircle" />
      </svg>
      <!-- 暂停 -->
      <svg class="icon" aria-hidden="true" v-else @click="isPlay">
        <use xlink:href="#icon-24gl-pauseCircle" />
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiaomoshi" />
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailsShow"
      position="bottom"
      :style="{ height: '100%',width:'100%' }"
    >
      <PopupDetails
        :index="playListIndex"
        :Popdetails="playList[playListIndex]"
        :isPlay="isPlay"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { $on } from "vue-happy-bus";
// 弹出层组件
import PopupDetails from "@/components/item/PopupDetails.vue";
export default {
  name: "FooterMusic",
  data() {
    return {
      interVal: ""
    };
  },
  components: {
    PopupDetails
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    // 切歌的时候 将时间变更
    this.updateTime();
    // 获取子组件的值 切歌的时候 滚轮回滚
    $on("formatScroll", lyricbox => {
      lyricbox.scrollTop = 0;
    });

    //切歌也要触发
    this.addDuration()
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailsShow","currentTime"])
  },
  methods: {
    ...mapMutations([
      "updatebtnShow",
      "updateDetailsShow",
      "updateCurrentTime",
      "updatePlayListIndex",
      "updateDuration"
    ]),
    //切割作者名字
    subCreatorName(name){
      if (name.length > 6) {
        name = name.substr(0, 6) + "...";
        return name;
      } else {
        return name;
      }
    },
    //点击播放逻辑
    isPlay() {
      let audio = this.$refs.audio;
      if (audio.paused == true) {
        audio.play();
        this.updatebtnShow(false);
        this.updateTime();
      } else {
        audio.pause();
        this.updatebtnShow(true);
        clearInterval(this.interVal);
      }
    },
    //实时获取歌曲进行的时间
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 500);
    },
    addDuration(){
      this.updateDuration(this.$refs.audio.duration); 
    }
  },
  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updatebtnShow(false);
      }
      $on("formatScroll", lyricbox => {
      lyricbox.scrollTop = 0;
    });
    },
    playList() {
      this.$refs.audio.autoplay = true;
      this.isbtnShow = true;
      this.updatebtnShow(false);
    },
    currentTime(){
      if(this.$refs.audio.ended == true){
      console.log('触发');
      if(this.playListIndex <= this.playList.length - 1){
        this.updatePlayListIndex(this.playListIndex+1)
      }else{
        this.updatePlayListIndex(0)
      }
      
    }
    }
  }
};
</script>

<style lang="less" scoped>
.footermusic {
  width: 100%;
  height: 1.2rem;
  border-top: 1px solid #999;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 0 0.2rem;
  align-items: center;
  justify-content: space-between;
  .footer-left {
    box-sizing: border-box;
    width: 70%;
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
    .song-name {
      display: flex;
      width: 70%;
      height: 80%;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;
      text-overflow: ellipsis;
      p {
        display: inline-block;
        overflow: hidden;
        height: 0.4rem;
      }
      span {
        color: gray;
        font-size: 0.24rem;
      }
    }
  }
  .footer-right {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>