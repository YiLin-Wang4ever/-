<template>
  <div class="login_box">
      <div class="close" @click="$router.push('/')">取消登录</div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-wangyiyunyinle-copy" />
    </svg>
    <van-form class="myform">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px; text-align:center;">
        <van-button round block type="primary" @click="login" style="margin-bottom:.3rem;">提交</van-button>
        <span class="ps">ps:手机号和密码为网易云音乐的手机号密码</span>
      </div>
      
    </van-form>
  </div>
</template>

<script>
import { getUserInfo } from '@/request/api/home';
import { mapMutations } from 'vuex';
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: ""
    }
  },
  methods:{
      async login(){
        let res = await this.$store.dispatch('login',{phone:this.phone,password:this.password});
        if(res.data.code == 200){
            localStorage.setItem('token',res.data.token);
            let result = await getUserInfo(res.data.account.id);
            this.updateUser(result.data.profile);
            this.$router.push('/userinfo');
        }else{
            alert('手机号或者密码错误！');
            this.phone = '';
            this.password = ''; 
        }
      },
      ...mapMutations(['updateUser'])
  }
};
</script>

<style scoped lang="less">
    .login_box{
        width: 100%;
        box-sizing: border-box;
        z-index: -1;
        background-color: #e1e1e1;
        height: 16rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 3.5rem 0;
        
        .close{
            font-size: .34rem;
            font-weight: 500;
            position: absolute;
            top: 2%;
            left: 5%;
        }
        .icon{
            width: 3rem;
            height: 3rem;
            z-index: 1;
        }
        .ps{
            color: gray;
        }
        
    }
</style>