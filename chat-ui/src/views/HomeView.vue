<template>
  <div class="home">
    <div>
      登陆页
    </div>
    <div>
      用户id：<input v-model="userId" />
      <br />
      聊天对象id：<input v-model="to" />
      <br />
      <button @click="loginHandler">登陆</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      userId: "",
      userSig: "",
      to: ""
    }
  },
  methods: {
    async loginHandler() {
      const result = await this.$axios({
        methods: "GET",
        url: `http://127.0.0.1:8080/${this.userId}`,
      })
      this.userSig = result.data
      console.log(this.userSig)
      this.$store.commit('setUserId', this.userId)
      this.$store.commit('setTo', this.to)

      try {
        let res = await this.tim.login({ userID: this.userId, userSig: this.userSig });
   
        this.$router.push({ path: `/chat` })


      } catch (e) {
        console.log('login error:', e); // 登录失败的相关信息
      }





    },

  }
}
</script>
