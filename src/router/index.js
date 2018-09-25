import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import Login from '@/components/login/login';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect:{name:'index'}
    },{
      path:'/index',
      name: 'index',
      component: Index
    },{
      path:'/login',
      name: 'login',
      component: Login
    }
  ]
});

export default router ;
