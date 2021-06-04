<template>
  <div class="container" v-if="channel">
    <div class="board_box">
      <div class="board_status">
        <div class="board_status_1 stat_item">ID: {{ channel.id }}</div>
        <div class="board_status_2">
          <div class="left_stat">
          <div class="stat_item">Channel Name: {{ channel.name }}</div>
          <div  class="stat_item">Ready Players:</div>
          <div v-if="isGameActive && !finish">You Taped {{tapedCount}} points</div>
          <div v-if="finish" class="stat_item">Winner: {{ratings[0].username}}</div>
        </div>
        <div class="right_stat">
          <div  class="stat_item">Game Time: {{ timer }}</div>
          <div>{{ channel.players.length }}/{{ channel.max }}</div>
        </div>
        </div>
      </div>
      <div class="board">
        <div
          class="countdown-box"
          v-if="countDownSteps.length && !isGameActive"
        >
          <div v-for="step in countDownSteps" :key="step">{{ step }}</div>
        </div>
        <div v-if="isGameActive && !finish">
          <v-stage ref="stage" :config="configKonva">
            <v-layer ref="layer">
              <v-circle
                @click="handleClick"
                v-for="item in list"
                :key="item.id"
                :config="{
                  x: item.x,
                  y: item.y,
                  radius: 50,
                  fill: 'red',
                  rotation: item.rotation,
                  id: item.id,
                  numPoints: 5,
                  innerRadius: 30,
                  outerRadius: 50,
                  fill: '#D44D4D',
                  opacity: 0.8,
                  scaleX:
                    dragItemId === item.id ? item.scale * 1.2 : item.scale,
                  scaleY:
                    dragItemId === item.id ? item.scale * 1.2 : item.scale,
                  shadowColor: 'black',
                  shadowBlur: 10,
                  shadowOffsetX: dragItemId === item.id ? 15 : 5,
                  shadowOffsetY: dragItemId === item.id ? 15 : 5,
                  shadowOpacity: 0.6,
                }"
              ></v-circle>
            </v-layer>
          </v-stage>
        </div>
        <ol v-else-if="finish">
          <li v-for="user in ratings" :key="user.id">
            {{ user.username }} {{ user.taps }}
          </li>
        </ol>
      </div>
      <template v-if="!ready">
        <div class="button_box">
          <button @click="getReady">Ready</button>
        </div>
        <div class="button_box">
          <button @click="getInviteLink">Copy Invitation Link</button>
        </div>
      </template>
      <template v-else-if="ready && !isGameActive">
        <div class="button_box">
          <button>
            Waiting {{ channel.max - channel.players.length }} players
          </button>
        </div>
      </template>
      <template v-if="isGameActive">
        <div class="button_box">
          <router-link to="/">
            <button>
              Quit
            </button>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const width = 495;
const height = 499;
export default {
  data() {
    return {
      list: [],
      dragItemId: null,
      configKonva: {
        width: width,
        height: height,
      },
      channel: this.$store.state.channel,
      user: this.$store.state.user,
      ready: false,
      countDownSteps: [],
      isGameActive: false,
      ratings: [],
      finish: false,
      tapedCount: 0,
      timer: null
    };
  },
  methods: {
    handleClick(e) {
      this.tapedCount ++
      this.socket.emit(
        "tap",
        { user: this.user, tapId: e.target.id() },
        (res) => {
          console.log(res);
        }
      );
    },
    getReady() {
      const user = this.$store.state.user;
      this.socket.emit("ready", user, (res) => {
        if (typeof res == "string") {
          return alert(res);
        }
        console.log(res);
        this.ready = true;
      });
    },
    getInviteLink() {
      navigator.clipboard
        .writeText(`http://localhost:8080?channelId=${this.channel.id}`)
        .then(
          function() {
            alert("Copied succesfully");
          },
          function() {
            alert("Something went wrong");
          }
        );
    },
  },

  mounted() {
    this.socket.on("readyPlayers", (res) => {
      console.log("READY", res);
      const updatedChannel = {
        ...this.channel,
        players: res,
      };
      this.channel = updatedChannel;
      this.$store.commit("setChannel", updatedChannel);
    });

    this.socket.on("countDown", (res) => {
      this.countDownSteps.push(res);
    }),
      this.socket.on("newPoints", (res) => {
        console.log("newPoints", res);
        this.isGameActive = true;
        this.list = res;
      });

    this.socket.on("finish", (res) => { 
      this.ratings = res.slice().sort((a,b) => b.taps - a.taps) 
      this.finish = true;
    });

    this.socket.on("time", (res)=>{
      this.timer = res
    })
  },

  created() {
    console.log(this.ready);
    const user = this.$store.state.user;
    if (!user) {
      return this.$router.push('/')
    }
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

.board_status {
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: space-between; */
  margin-bottom: 15px;
  color: #fff;
}

.board_status_2 {
  display: flex;
  justify-content: space-between;
}

.right_stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-content: flex-end;
  justify-content: ;
}

.stat_item {
  margin-bottom: 10px;
}


.board {
  border: 1px solid #ff9494;
  height: 500px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}

.board_box {
  display: flex;
  width: 500px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  background-color: #12444f;
  padding: 30px 20px;
}

.countdown-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 177px;
  height: 155px;
  border: solid 1px #e1e1e1;
  color: #fff;
}

.button_box {
  display: flex;
  justify-content: center;
  align-items: center;
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

ol {
  color: #fff;
}
</style>
