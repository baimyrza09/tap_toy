import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import CreateGame from '../views/CreateGame'
import Channel from '../views/Channel'
import Ratings from '../views/Ratings'
import GameDetails from '../views/GameDetails'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/creategame',
    name: 'CreateGame',
    component: CreateGame
  },
  {
    path: '/channel',
    name: 'Channel',
    component: Channel
  },
  {
    path: '/rating',
    name: 'Ratings',
    component: Ratings,
  },
    {
      path: '/rating/:id',
      name: 'GameDetails',
      component: GameDetails
    
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
