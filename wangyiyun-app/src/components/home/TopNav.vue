<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mulu" />
      </svg>
    </div>
    <div class="topContent">
      <span @click="$router.push('/userinfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
    name:"TopNav"
};
</script>

<style lang="less" scoped>
    .topNav{
        width: 100%;
        padding: .2rem;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topContent{
            display: flex;
            width: 65%;
            justify-content: space-around;
            // align-items: center;
            font-size: .36rem;
        }
        .topLeft{
            display: flex;
            align-items: center;
        }
        .topRight{
            display: flex;
            align-items: center;
            .icon{
              fill: black;
            }
        }
        .active{
            font-weight: 600;
        }
    }
</style>