/*
  用于存放项目中公共数据
*/

import Vue from 'vue';
import Vuex from  'vuex';
Vue.use(Vuex);

//针对header模块的store
import header from './header';
// import com from './common';

export default new Vuex.Store({
  modules:{
    header,
    // com
  }
})
