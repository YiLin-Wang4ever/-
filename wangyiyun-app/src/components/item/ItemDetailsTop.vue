<template>
  <div class="itemDetailsTop">
    <img class="bgimg" :src="this.playlist.coverImgUrl" alt />
    <div class="header">
      <div class="item-left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou" />
        </svg>
        <span>歌单</span>
      </div>
      <div class="item-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mulu" />
        </svg>
      </div>
    </div>
    <div class="middle">
      <div class="middle-left">
        <img class="listimg" :src="this.playlist.coverImgUrl" alt />
        <span class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-white24gl-play" />
          </svg>
          {{ changeCount(this.playlist.playCount) }}
        </span>
      </div>
      <div class="middle-right">
        <div class="right-top">{{ this.playlist.name }}</div>
        <div class="right-mid">
          <img :src="this.playlist.creator.backgroundUrl" alt />
          <span>
            {{ this.playlist.creator.nickname }}
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow-right" />
            </svg>
          </span>
        </div>
        <div class="right-bottom">{{checkWordLength(this.playlist.description)}}</div>
      </div>
    </div>
    <div class="footer">
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun" />
        </svg>
        <span>{{this.playlist.commentCount}}</span>
      </div>
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang" />
        </svg>
        <span>{{this.playlist.shareCount}}</span>
      </div>
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07" />
        </svg>
        <span>下载</span>
      </div>
      <div class="icon-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xuanze-duoxuan-tianchong" />
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemDetailsTop",
  props: ["playlist"],
  data() {
    return {
      itemDetails: {}
    };
  },
  methods: {
    changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
    checkWordLength(word){
      if(word.length > 25){
        word = word.substr(0,25) + "···";
        return word
      }
    }
  }
};
</script>

<style lang="less" scoped>
.itemDetailsTop {
  width: 100%;
  position: relative;
  .bgimg {
    width: 100%;
    height: 9rem;
    position: absolute;
    filter: blur(35px);
    z-index: -1;
  }
  .header {
    width: 100%;
    height: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .item-left,
    .item-right {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 0.4rem;
        color: white;
      }
      .icon {
        fill: white;
      }
    }
  }
  .middle {
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 3rem;
    margin-top: 0.2rem;
    .middle-left {
      width: 42%;
      display: flex;
      position: relative;
      justify-content: center;
      height: 100%;
      .listimg {
        width: 3rem;
        height: 3rem;
        border-radius: 0.24rem;
      }
      .playCount {
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
        color: white;
        font-size: .24rem;
        padding: 0 .1rem;
        display: inline-block;
        box-sizing: border-box;
        border-radius: .2rem;
        text-align: center;
        width: auto;
        height: .3rem;
        line-height: .3rem;
        background-color: #999;
        .icon {
          width: 0.2rem;
          height: 0.2rem;
          color: rgb(157, 54, 54);
        }
      }
    }
    .middle-right {
      width: 53%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .right-top {
        font-size: 0.32rem;
        font-weight: 900;
        color: white;
        height: 35%;
      }
      .right-mid {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 25%;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.6rem;
        }
        span {
          margin-left: 0.3rem;
          color: #e1e1e1;
          .icon {
            width: 0.3rem;
            height: 0.3rem;
            fill: #e1e1e1;
          }
        }
      }
    }
    .right-bottom {
      display: flex;
      align-items: flex-end;
      height: 47%;
      color: #e1e1e1;
      font-size: 0.28rem;
    }
  }
  .footer {
    width: 100%;
    height: 1.8rem;
    display: flex;
    padding: 0.3rem;
    justify-content: space-between;
    .icon-item {

      display: flex;
      width: 25%;
      height: 1rem;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      color: white;
      .icon {
        fill: white;
      }
    }
  }
}
</style>