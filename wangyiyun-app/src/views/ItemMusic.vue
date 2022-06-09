<template>
  <div class="ItemMusic">
    <ItemDetailsTop :playlist="this.itemList" v-if="flag" />
    <ItemMusicList v-if="flag" :allMusic="this.allMusic" :subscribedCount="this.itemList.subscribedCount" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getMusicItemList } from "@/request/api/item";
import { getAllMusic } from '@/request/api/item'
import ItemDetailsTop from "@/components/item/ItemDetailsTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue"
export default {
  name: "ItemMusic",
  data() {
    return {
      itemList: {}, // 歌单详情
      allMusic:[],
      flag:false
    };
  },
  components: {
    ItemDetailsTop,
    ItemMusicList
  },
  methods: {
    async getId() {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      let allMusic = await getAllMusic(id);
      console.log(allMusic);
      console.log(res);
      this.itemList = res.data.playlist;
      this.allMusic = allMusic.data.songs;
      this.flag = true
      // 防止页面刷新数据丢失 将数据存储在session storage
      // sessionStorage.setItem("itemDetails", JSON.stringify(itemcontent));
    },
  },
  mounted() {
    this.getId();
  },
};
</script>

<style lang="less" scoped>
</style>