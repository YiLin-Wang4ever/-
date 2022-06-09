import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '@/store';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    component: () => import(/* webpackChunkName: "about" */ '../views/ItemMusic.vue')
  },
  {
    path:'/search',
    name:"search",
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path:'/userinfo',
    name:"userinfo",
    component: () => import(/* webpackChunkName: "about" */ '../views/UserInfo.vue'),
  },
  {
    path:'/login',
    name:"login",
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  
  routes
})
//全局路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    store.state.isShowFooter = false;
  }else{
    store.state.isShowFooter = true;
  }
  if(to.path == '/userinfo'){
    let token = localStorage.getItem('token');
    if(token){
      next();
    }else{
      next('/login');
    }
  }else{
    next();
  }
})


export default router
