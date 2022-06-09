<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">推荐歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :show-indicators="false"
        class="music-swpie"
        :loop="false"
        :width="130"
      >
        <van-swipe-item class="item-list" v-for="item in musicList" :key="item">
          <router-link :to="{ path: '/ItemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-white24gl-play" />
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
export default {
  name: "MusicList",
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getGedan() {
      let res = await getMusicList();
      this.musicList = res.data.result;
    },
    changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
  mounted() {
    this.getGedan();
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 26rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    display: flex;
    margin-bottom: 0.3rem;
    justify-content: space-between;
    align-items: center;
    height: 0.3rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.6rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 5rem;
    .music-swpie {
      height: 100%;
      .item-list {
        box-sizing: border-box;
        margin: 0 0.08rem;
        img {
          width: 130px;
          height: 130px;
          border-radius: 12px;
          position: relative;
        }
        .playCount {
        position: absolute;
        top: 0.1rem;
        right: 0.15rem;
        color: white;
        font-size: .24rem;
        display: inline-block;
        padding: 0 .1rem;
        box-sizing: border-box;
        border-radius: .2rem;
        text-align: center;
        width: auto;
        height: .4rem;
        line-height: .4rem;
        background-color: #999;
        .icon {
          width: 0.2rem;
          height: 0.2rem;
          color: rgb(157, 54, 54);
        }
      }
        .name {
          width: 120px;
          display: inline-block;
        }
      }
    }
  }
}
</style>