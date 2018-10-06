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
import Test from '@/components/test/HelloWorld';
import Page404 from '@/components/page404';



import axios from 'axios';

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      //重定向
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      //需要验证登录才进入路由
      meta: {
        requiresAuth: true
      },
      children: [{
          path: 'shoplist',
          name: 'shoplist',
          component: ShopList,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'shopclassify',
          name: 'shopclassify',
          component: ShopClassify,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'userlist',
          name: 'userlist',
          component: UserList,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: UserInfo,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'userpwd',
          name: 'userpwd',
          component: UserPwd,
          meta: {
            requiresAuth: true
          },

        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: OrderList,
          meta: {
            requiresAuth: true
          },

        },
        {
          path: 'test',
          name: 'test',
          component: Test
        },
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/page404',
      name: 'page404',
      component: Page404
    }, {
      path: '*',
      redirect: {
        name: 'page404'
      }
    }
  ]
});


//路由拦截
//导航卫士(钩子函数)
//操作导航卫士时，路由处于暂停状态
router.beforeEach((to, from, next) => {
  // console.log(111,to,from,next);
  if (to.name=='login') {
    next();
    return;
  }
  if (sessionStorage.getItem('user')) {
    let user = JSON.parse(sessionStorage.user);
    let where = [{
        f: 'id',
        o: '=',
        v: `${user.id}`
      },
      {
        f: 'token',
        o: '=',
        v: `${user.token}`
      },
    ];
    where = JSON.stringify(where);
    axios.get(encodeURI(`api/checkedAccount?where=${where}`)).then(x => {
      let data = x.data;
      if (data.status) {
        if (data.data.length > 0) {
          next();
          return;
        }
      }
      next({
        name: 'login'
      });
    });
  } else {
    next({
      name: 'login'
    });
  }
});

export default router;
