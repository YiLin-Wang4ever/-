<template>
<div id="app">
  <router-view />
  <FooterMusicVue v-show="this.isShowFooter" />
</div>
  
</template>
<script>
import FooterMusicVue from './components/item/FooterMusic.vue'
import { mapState } from 'vuex'
export default {
  components:{
    FooterMusicVue
  },
  computed:{
    ...mapState(['isShowFooter'])
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  overflow: hidden;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
a {
  color: #333;
}
</style>
