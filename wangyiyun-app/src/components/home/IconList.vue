<template>
  <div class="iconBox">
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian" />
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dianshiji" />
      </svg>
      <span>私人FM</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan" />
      </svg>
      <span>歌单</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbanggequ" />
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconList"
};
</script>

<style lang="less" scoped>
.iconBox {
  width: 100%;
  height: 2rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon-item{
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon{
          width: 1rem;
          height: 1rem;
      }
  }
}
</style>