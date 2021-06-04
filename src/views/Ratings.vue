<template>
  <div class="container">
    <div class="board_box">
      <div class="board_status">
        <div>List of Games</div>
      </div>
      <div class="board">
        <ol>
          <li v-for="game in games" :key="game.id">
            <router-link :to="`/rating/${game._id}`">{{ game.channel.name }} </router-link>
          </li>
        </ol>
      </div>
      <div class="button_box">
        <router-link to="/">
          <button>
            Quit
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      games: [],
    };
  },
  methods: {},

  mounted() {
    axios.get("https://taptoy-server.herokuapp.com/games").then((res) => {
      this.games = res.data;
    });
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
  display: flex;
  justify-content: space-between;
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
  justify-content: flex-end;
}

.stat_item {
  margin-bottom: 10px;
}


.board {
  border: 1px solid #ff9494;
  height: 500px;
  padding: 3px;
 
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