import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// IM
import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

let options = {
  SDKAppID: 1400821471 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
};
let tim = TIM.create(options); // SDK 实例通常用 tim 表示


// 监听ready状态
let onSdkReady = (event) => {
  store.commit('setReady', true)
};
tim.on(TIM.EVENT.SDK_READY, onSdkReady);


// 监听别人发送对我的消息消息
// SDK 收到推送的单聊、群聊、群提示、群系统通知的新消息，接入侧可通过遍历 event.data 获取消息列表数据并渲染到页面
let onMessageReceived = function (event) {
  // event.data - 存储 Message 对象的数组 - [Message]
  for (let i = 0; i < event.data.length; i++) {
    store.commit('pushMsg',event.data[i])
  }

};
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);



tim.setLogLevel(0);

tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });

Vue.prototype.TIM = TIM;
Vue.prototype.tim = tim;


Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
