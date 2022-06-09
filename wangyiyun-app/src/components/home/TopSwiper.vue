<template>
  <div id="topSwiper">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

import {getBanners} from '@/request/api/home'
import { onMounted,reactive } from 'vue';
export default {
  name: "TopSwiper",
  setup() {
    const state = reactive({
        images:[]
    })
    onMounted(async ()=>{
        let res = await getBanners();
        console.log(res);
        state.images = res.data.banners
    })
    return { state };
  },



};
</script>

<style lang="less">
#topSwiper {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
        padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicators{
        .van-swipe__indicator--active {
        background-color: rgb(219,130,130);
    }
    }
  }
}
</style>