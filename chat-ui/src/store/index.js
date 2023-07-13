import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isReady: false,
    userId: "",
    to: "",
    msgList: []
  },
  getters: {
  },
  mutations: {
    setReady(state, flag) {
      state.isReady = flag;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setTo(state, to) {
      state.to = to;
    },
    setMsgList(state, msgList) {
      state.msgList = msgList
    },
    pushMsg(state, msg) {
      state.msgList.push(msg)
    }
  },
  actions: {
    async getMessageList(store, payload) {
      let res = await Vue.prototype.tim.getMessageList({ conversationID: `C2C${payload.to}`, count: 20 })
      store.commit('setMsgList', res.data.messageList);
      console.log(res)
    }
  },
  modules: {
  },
  /* vuex数据持久化配置 */
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ["userId","to"]
    })
  ]
})
