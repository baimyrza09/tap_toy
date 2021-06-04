<template>
  <div class="container">
    <form @submit.prevent="createChannel">
      <input
        type="text"
        placeholder="Player Name"
        v-model="playerName"
        required
      />
      <input type="text" placeholder="Channel Name" v-model="name" required />
      <input type="number" placeholder="MAX_PLAYERS" v-model="max" required />
      <input type="text" placeholder="TIMELIMIT" v-model="time" required />
      <select v-model="speed" required>
        <option value="slow">Slow</option>
        <option value="medium">Medium</option>
        <option value="fast">Fast</option>
      </select>

      <div class="form_box">
        <button type="submit">CREATE</button>
      </div>
       <div class="form_box">
          <router-link to="/">
            <button>
              Quit
            </button>
          </router-link>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: null,
      name: null,
      max: null,
      time: null,
      speed: null,
    };
  },
  methods: {
    createChannel() {
      this.socket.emit(
        "createChannel",
        {
          username: this.playerName,
          name: this.name,
          max: this.max,
          time: this.time,
          speed: this.speed,
        },
        (res) => {
          if (typeof res == "string") {
            return alert(res);
          }
          this.$store.commit("setChannel", res.newChannel);
          this.$store.commit("setUser", res.newUser);
          this.$router.push("/channel");
        }
      );
    },
  },
  mounted() {
    console.log(this.socket);
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
input,
select {
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
  color: #fff;
}
input:focus {
  background-color: #fff;
  color: black;
}
select:focus-within {
  background-color: #fff;
  color: black;
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

button {
  width: 206px;
  height: 56px;
  padding: 8px 16px;
  border-radius: 5px;
  outline: none;
  border: none;
  color: #fff;
  background-color: #126bef;
  margin-top: 20px;
  font-size: 18px;
}
</style>
