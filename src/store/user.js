export default {
  //用于存放数据
  state: {
    userRole: {}
  },
  //获取数据
  //与组件中的computed类似
  //调用方式： $store.getters.xxx
  getters: {

  },
  //事件:用于同步操作
  //与组件中的methods类似
  //调用方式:$store.commit(type)
  mutations: {
    setUserRole(state, payload) {
      state.userRole = payload;
    },
  },
  //事件:用于异步操作
  actions: {

  }
}
