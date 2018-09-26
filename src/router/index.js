import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import Login from '@/components/login/login';


import ShopList from '@/components/shop/list/shopList';
import ShopClassify from '@/components/shop/classify/shopClassify';
import UserList from '@/components/user/list/userList';
import UserInfo from '@/components/user/info/userInfo';
import UserPwd from '@/components/user/password/userPwd';
import OrderList from '@/components/order/list/list';


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect:{name:'index'}
    },{
      path:'/index',
      name: 'index',
      component: Index,
      children:[
        {
          path:'shoplist',
          name:'shoplist',
          component:ShopList
        },
        {
          path:'shopclassify',
          name:'shopclassify',
          component:ShopClassify
        },
        {
          path:'userlist',
          name:'userlist',
          component:UserList
        },
        {
          path:'userinfo',
          name:'userinfo',
          component:UserInfo
        },
        {
          path:'userpwd',
          name:'userpwd',
          component:UserPwd
        },
        {
          path:'orderlist',
          name:'orderlist',
          component:OrderList
        },
    ]
    },{
      path:'/login',
      name: 'login',
      component: Login
    }
  ]
});



export default router ;
