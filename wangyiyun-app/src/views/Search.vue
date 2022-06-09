<template>
  <div class="container">
    <div class="header">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou" />
      </svg>
      <input
        class="s_input"
        type="text"
        v-model="keyword"
        @keydown.enter="addHistroy"
        placeholder="陈奕迅"
      />
    </div>
    <div class="histroy">
      <span class="word">历史</span>
      <van-swipe class="swipe" :loop="false" :show-indicators="false" :width="70" :height="30">
        <van-swipe-item @click="clickHistroy(item)" class="keyword" v-for="(item,index) in histroy" :key="index">{{item}}</van-swipe-item>
      </van-swipe>
      <svg class="icon" aria-hidden="true" @click="deleteHistroy">
        <use xlink:href="#icon-shanchu" />
      </svg>
    </div>
    <div class="searchList">
      <div class="no_result" v-show="no_result" >未搜索到相关内容</div>
      <div class="music-item" v-show="have_result" v-for="(item,index) in this.searchList" :key="index">
        <div class="item-left" @click="play(item)">
          <span class="index">{{index + 1}}</span>
          <div class="name">
            <span class="songname">{{subSongName(item.name)}}</span>
            <div class="creatorbox">
              <span class="creator" v-for="(cname,i) in item.artists" :key="i">{{subCreatorName(cname.name)}}</span>
            </div>
          </div>
        </div>
        <div class="item-right">
          <svg class="icon shipin" aria-hidden="true" v-if="item.mvid!=0">
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
import { searchByKeyWord } from '@/request/api/home';
import { mapMutations, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      histroy: [],
      keyword: "",
      searchList:'',
      no_result:false,
      have_result:true
    };
  },
  computed:{
    ...mapState(['playList'])
  },
  mounted() {
    this.showHistroy();
  },
  methods: {
    // 将输入框的值添加到历史记录中 并且存储到localstroage
    ...mapMutations(['pushPlayList',"updatePlayListIndex","updateDetailsShow"]),
    async addHistroy() {
      if (this.keyword !== "" && this.keyword !== null) {
        this.histroy.unshift(this.keyword);
        let newArr = Array.from(new Set(this.histroy));
        // 判断 如果长度大于11的话 就删除最后一位 防止数据过长
        if(newArr.length > 11){
          newArr.splice(newArr.length - 1,1);
        }
        this.histroy = newArr;
        localStorage.setItem("histroy", JSON.stringify(this.histroy));
        let res = await searchByKeyWord(this.keyword);
        if(res.data.result.songs == undefined){
        this.no_result = true;
        this.have_result = false;
        }else{
          this.no_result = false;
          this.have_result = true;
          this.searchList = res.data.result.songs;
        }
        this.keyword = "";
      } else {
        alert("搜索内容不能为空");
      }
    },
    showHistroy() {
      let histroy = JSON.parse(localStorage.getItem("histroy"))
        ? JSON.parse(localStorage.getItem("histroy"))
        : [];
      this.histroy = histroy;
    },
    deleteHistroy() {
      localStorage.removeItem("histroy");
      this.histroy = [];
    },
    async clickHistroy(item){
      let res = await searchByKeyWord(item);
      if(res.data.result.songs == undefined){
        this.no_result = true;
        this.have_result = false;
      }else{
        this.no_result = false;
        this.have_result = true;
        this.searchList = res.data.result.songs
      }
      
    },
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
    play(item){
      item.al = item.album;
      item.ar = item.artists;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.pushPlayList(item);
      this.updatePlayListIndex(this.playList.length - 1);
      this.updateDetailsShow();
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  .header {
    width: 100%;
    padding: 0.15rem;
    display: flex;
    align-items: center;
    .icon {
      width: 12%;
    }
    .s_input {
      width: 88%;
      height: 0.6rem;
      border: none;
      margin-left: .1rem;
      border-bottom: 1px solid #e1e1e1;
    }
  }
  .histroy {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    padding: 0.1rem 0.2rem;
    .word {
      display: inline-block;
      width: 15%;
      font-size: 0.34rem;
      font-weight: 700;
    }
    .swipe {
      width: 80%;
      display: inline-block;
      .keyword {
        border-radius: 0.2rem;
        line-height: 30px;
        text-align: center;
        margin-right: 0.1rem;
        background-color: #e1e1e1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      display: inline-block;
      align-items: center;
    }
  }
  .searchList{
    width: 100%;
    padding: 0 0.2rem;
    .no_result{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
    }
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