require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from './views/App'
import Hello from './views/Hello'
import Home from './views/Home'
import UsersIndex from './views/UsersIndex'
import UsersIndexBeforeLoad from './views/UsersIndexBeforeLoad'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello,
    },
    {
      path: '/users',
      name: 'users.index',
      component: UsersIndexBeforeLoad,
    },
    {
        path: '/users_all',
        name: 'users.index_all',
        component: UsersIndex,
    },
  ],
});

const app = new Vue({
  el: '#app',
  components: { App },
  router,
});
