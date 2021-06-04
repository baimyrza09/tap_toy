<template>
  <div class="container">
    <form @submit.prevent="joinToChannel">
      <input
        type="text"
        placeholder="Channel ID"
        required
        v-model="channelID"
      />
      <input type="text" placeholder="Username" required v-model="username" />

      <div class="form_box"><button class="btn" type="submit">JOIN</button></div>
      <div class="form_box">
        <router-link to="/creategame">or create channel</router-link>
      </div>
      <div class="form_box">
        <router-link to="/rating"><button class="btn" type="submit">Ratings</button></router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channelID: null,
      username: null,
    };
  },
  methods: {
    joinToChannel() {
      this.socket.emit(
        "joinToChannel",
        {
          channelId: this.channelID,
          username: this.username,
        },
        (res) => {
          if (typeof res == "string") {
            return alert(res);
          }
          this.$store.commit("setChannel", res.channel);
          this.$store.commit("setUser", res.newUser);
          this.$router.push("/channel");
        }
      );
    },
  },
  mounted() {
    this.channelID = this.$route.query.channelId
    // console.log(this.socket);
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
input {
  width: 100%;
  height: 46px;
  padding: 8px 8px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ff9494;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #12444f;
  margin-bottom: 40px;
}
input:focus {
  background-color: #fff;
}
::placeholder {
  color: #fff;
}

form {
  display: flex;
  width: 500px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  background-color: #12444f;
  padding: 0 20px;
}

.form_box {
  display: flex;
  justify-content: center;
}

.btn {
   width: 206px;
  height: 56px;
  padding: 8px 16px;
  border-radius: 5px;
  outline: none;
  border: none;
  color: #fff;
  background-color: #126bef;
  margin-top: 10px;
  font-size: 18px;
}
a {
  margin-top: 15px;
  color: #3999f9;
}
</style>
