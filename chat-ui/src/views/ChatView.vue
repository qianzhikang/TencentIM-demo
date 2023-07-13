<template>
  <el-container>
    <el-aside width="200px">Something</el-aside>
    <el-container>
      <el-header>Chat</el-header>
      <el-main ref="scrollContainer">
        <div v-for="(item, index) in $store.state.msgList" :key="index"
          :class="{ 'msg_item_left': item.flow === 'in', 'msg_item_right': item.flow === 'out' }">
          <div class="msg_avatar_left" v-if="item.flow === 'in'">
            <el-avatar :size="50"
              :src="item.avatar != '' ? item.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
          </div>
          <div :class="{ 'msg_left': item.flow === 'in', 'msg_right': item.flow === 'out' }">
            {{ item.payload.text }}
          </div>
          <div class="msg_avatar_right" v-if="item.flow === 'out'">
            <el-avatar :size="50"
              :src="item.avatar != '' ? item.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-input v-model="msg" placeholder="请输入内容" class="input" />
        <el-button type="primary" @click="sendMessage">提交</el-button>
      </el-footer>
    </el-container>
  </el-container>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ChatView',
  components: {
  },
  data() {
    return {
      msgList: [],
      msg: "",
    }
  },

  updated() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },

  watch: {
    isReady(value) {
      console.log("执行------------> 获取记录")
      if (value) {
        this.getMessageList({ "to": this.$store.state.to });
      } else {
        alert("需要登陆")
      }
    }
  },

  computed: {
    ...mapState(['isReady', 'userId', 'to'])

  },
  methods: {
    ...mapActions(['getMessageList']),
    async sendMessage() {
      if (!this.isReady) {
        alert("im还没有准备好")
        return;
      } else {
        // 1. 创建消息实例，接口返回的实例
        let message = this.tim.createTextMessage({
          to: this.to,
          conversationType: this.TIM.TYPES.CONV_C2C,
          payload: {
            text: this.msg
          }
        });
        try {
          // 2. 发送消息
          let res = await this.tim.sendMessage(message);
          console.log(res.data)
          if (res.code == 0) {
            this.msg = ''
            this.$store.commit('pushMsg', res.data.message)
          }
        } catch (e) {
          console.log('send error:', e); // 发送失败的相关信息
        }
      }
    },
    scrollToBottom() {
      const container = this.$refs.scrollContainer.$el;
      container.scrollTop = container.scrollHeight;
    }
  }
}
</script>
<style scoped>
.msg_item_left {
  display: flex;
  align-self: flex-start;
}

.msg_item_right {
  display: flex;
  align-self: flex-end;
}

.msg_avatar_left {
  display: inline;
}

.msg_avatar_right {
  display: inline;
}

.msg_left::before {
  position: absolute;
  top: 30%;
  left: -15px;
  padding: 0;
  border: 8px solid;
  border-color: transparent limegreen transparent transparent;
  content: '';
}

.msg_left {
  position: relative;
  background-color: limegreen;
  margin: 10px 20px;
  padding: 8px;
  border: solid 1px limegreen;
  border-radius: 10px;
  max-width: 200px;
  min-height: 20px;
}


.msg_right::before {
  position: absolute;
  bottom: 30%;
  right: -15px;
  padding: 0;
  border: 8px solid;
  border-color: transparent transparent transparent lightgray;
  content: '';
}


.msg_right {
  position: relative;
  background-color: lightgray;
  margin: 10px 20px;
  padding: 8px;
  border: solid 1px lightgray;
  border-radius: 10px;
  max-width: 200px;
  min-height: 20px;
}



.input {
  width: 80%;
  margin-right: 10px;
}


.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.el-container {
  height: 100%;
}
</style>