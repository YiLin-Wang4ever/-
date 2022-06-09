<template>
  <div class="music-list">
    <div class="top">
      <div class="top-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playCircle" />
        </svg>
        <span class="playall">播放全部</span>
        <span class="music-nums">(共{{this.allMusic.length}}首)</span>
      </div>
      <div class="top-right">
        <div class="collect">＋收藏({{this.subscribedCount}})</div>
      </div>
    </div>
    <div class="bottom">
      <div class="music-item" v-for="(item,index) in this.allMusic" :key="index">
        <div class="item-left" @click="playMusic(index)">
          <span class="index">{{index + 1}}</span>
          <div class="name">
            <span class="songname">{{subSongName(item.name)}}</span>
            <div class="creatorbox">
              <span class="creator" v-for="(cname,i) in item.ar" :key="i">{{subCreatorName(cname.name)}}</span>
            </div>
          </div>
        </div>
        <div class="item-right">
          <svg class="icon shipin" aria-hidden="true" v-if="item.mv!=0">
            <use xlink:href="#icon-shipin" />
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mulu" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { $on } from "vue-happy-bus";
export default {
  name: "ItemMusicList",
  props: ["allMusic", "subscribedCount"],
  methods: {
    subSongName(name) {
      if (name.length > 10) {
        name = name.substr(0, 10) + "···";
        return name;
      } else {
        return name;
      }
    },
    subCreatorName(name){
      if (name.length > 6) {
        name = name.substr(0, 6) + "...";
        return name;
      } else {
        return name;
      }
    },
    playMusic(index) {
      // 让它播放时展开弹出框
      this.updateDetailsShow()
      this.updatePlayList(this.allMusic);
      this.updatePlayListIndex(index);
      $on("formatScroll", lyricbox => {
      lyricbox.scrollTop = 0;
      });
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex","updateDetailsShow"])
  },
  computed:{
    ...mapState(['playListIndex',"audio"])
  }
};
</script>

<style lang="less" scoped>
.music-list {
  width: 100%;
  height: 26rem;
  background-color: #fff;
  padding: 0 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .top {
    width: 100%;
    display: flex;
    height: 1rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #fff;
    .top-left {
      width: 45%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      .icon {
        margin-right: 0.3rem;
      }
      .playall {
        font-weight: 900;
      }
      .music-nums {
        font-size: 0.24rem;
        color: #e1e1e1;
      }
    }
    .top-right {
      width: 30%;
      box-sizing: border-box;
      .collect {
        width: auto;
        background-color: red;
        text-align: center;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.5rem;
        color: white;
        font-size: 0.26rem;
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 0 0.1rem;
    .music-item {
      width: 100%;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-left {
        display: flex;
        width: 70%;
        align-items: center;
        .index {
          display: inline-block;
          width: 10%;
        }
        .name {
          display: flex;
          width: 100%;
          flex-direction: column;
          padding-left: 0.1rem;
          .songname {
            font-weight: 600;
          }
          .creatorbox {
            width: 100%;
            display: flex;
            margin-top: 0.1rem;
            text-overflow: ellipsis;
            overflow: hidden;
            height: 0.3rem;
            line-height: 0.3rem;
            .creator {
              // display: inline-block;
              // overflow: hidden;
              // text-overflow: ellipsis;
              margin-right: .1rem;
              // height: 0.3rem;
              // line-height: 0.3rem;
              font-size: 0.24rem;
              color: grey;
            }
          }
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        .icon {
          width: 0.35rem;
          height: 0.35rem;
          margin: 0 0.1rem;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>