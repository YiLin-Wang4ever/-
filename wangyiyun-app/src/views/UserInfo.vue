<template>
  <div class="info">
    <img class="bg_img" :src="this.userinfo.backgroundUrl" alt />
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
          <use xlink:href="#icon-zuojiantou" />
        </svg>
    <div class="header">
      <img class="profile_photo" :src="this.userinfo.avatarUrl" alt />
      <div class="nickname">{{this.userinfo.nickname}}</div>
      <div class="follow">
        {{this.userinfo.follows}}
        <span class="word">关注</span>
        {{this.userinfo.followeds}}
        <span class="word">粉丝</span>
      </div>
      <div class="intro">{{this.userinfo.signature}}</div>
    </div>
    <button class="logout" @click="logout">退出登录</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserInfo",
  data() {
    return {
      userinfo: {}
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("userinfo");
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    this.userinfo = this.user;
    console.log(this.userinfo);
    if (JSON.stringify(this.userinfo) !== "{}") {
      sessionStorage.setItem("userinfo", JSON.stringify(this.userinfo));
    } else {
      this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      console.log(this.userinfo);
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  width: 100%;
  height: 16rem;
  position: relative;
  background-color: #e1e1e1;

  .bg_img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .icon{
      width: .65rem;
      height: 0.65rem;
      position: absolute;
      top: 2%;
      left: 5%;
      fill: white;
  }
  .header {
    width: 90%;
    box-sizing: border-box;
    padding-top: 1.2rem;
    background-color: #fff;
    height: 3rem;
    border-radius: 0.5rem;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    text-align: center;
    .profile_photo {
      width: 1.6rem;
      height: 1.6rem;
      position: absolute;
      top: -30%;
      left: 50%;
      border-radius: 50%;
      transform: translateX(-50%);
    }
    .nickname {
      font-weight: 600;
      font-size: 0.4rem;
      color: black;
      text-align: center;
    }
    .follow {
      color: black;
      margin: 0.1rem 0;
      .word {
        color: #999;
      }
    }
    .intro {
      text-align: center;
      font-size: 0.3rem;
      color: #999;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .logout {
    width: 3rem;
    height: 1rem;
    border-radius: 0.2rem;
    border: none;
    background-color: #fff;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>