import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//引入login组件
import login from '../pages/login/login.vue';
//引入首页home组件
import home from '../pages/home/home.vue';
export default new Router({
  routes: [
    //注册login组件
    {
      path: '/login',
      component: login
    },
    //注册首页index组件
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          path: '',
          name: '首页',
          component: () => import('../pages/home/home.vue')
        },
        {
          path: 'menu',
          name: '菜单管理',
          component: () => import('../pages/menu/menu.vue'),
        },
        {
          path: 'role',
          name: '角色管理',
          component: () => import('../pages/roles/role.vue')
        },
        {
          path: 'manage',
          name: '管理员管理',
          component: () => import('../pages/manage/manage.vue')
        },
        {
          path:"category",
          name:"商品分类",
          component:()=>import('../pages/category/category.vue')
        },
        {
          path:"specifications",
          name:"商品分类",
          component:()=>import('../pages/specifications/specifications.vue')
        },
        {
          path:"commonditymange",
          name:"商品分类",
          component:()=>import('../pages/commonditymange/commonditymange.vue')
        },
        {
          path:"member",
          name:"会员管理",
          component:()=>import('../pages/member/member.vue')
        },
        {
          path:"banner",
          name:"轮播图管理",
          component:()=>import('../pages/banner/banner.vue')
        },
        {
          path:"seckill",
          name:"秒杀活动管理",
          component:()=>import('../pages/seckill/seckill.vue')
        }
      ]
    },
    //任意路由时，跳转首页
    {
      path: '*',
      redirect: '/'
    }
  ]
})
