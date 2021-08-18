import 'es6-promise/auto'
import axios from 'axios'



require('./bootstrap');
import Vue from 'vue'

import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

//import Index from './Index'
import auth from './auth'

import App from './views/App'
import Hello from './views/Hello'
import AdminHello from './views/AdminHello'
import Home from './views/Home'
import UsersIndex from './views/UsersIndex'
import UsersIndexBeforeLoad from './views/UsersIndexBeforeLoad'
import UsersEdit from './views/UsersEdit'
import NotFound from './views/NotFound'
import Forbidden from './views/Forbidden'
import UsersCreate from './views/UsersCreate'

import Register from './views/auth/Register'
import Login from './views/auth/Login'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: undefined
      }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          auth: false
        }
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello,
      meta: {
        auth: true
      }
    },
    {
        path: '/admin_hello',
        name: 'admin_hello',
        component: AdminHello,
        meta: {
            auth: {roles: 1, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
        }
    },
    {
      path: '/users',
      name: 'users.index',
      component: UsersIndexBeforeLoad,
      meta: {
        //auth: true
        auth: {roles: 1, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
      }
    },
    {
        path: '/users_all',
        name: 'users.index_all',
        component: UsersIndex,
        meta: {
            //auth: true
            auth: {roles: 1, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
          }
    },
    {
        path: '/users/:id/edit',
        name: 'users.edit',
        component: UsersEdit,
        meta: {
            //auth: {is_admin: 1, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
            auth: true
        }
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: UsersCreate,
        meta: {
            //auth: {is_admin: 1, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
            auth: true
        }
    },
    { path: '/404', name: '404', component: NotFound, },
    { path: '/403', name: '403', component: Forbidden, },
    { path: '*', redirect: '/404' },
  ],
});

// Set Vue router
Vue.router = router;
Vue.use(VueRouter);
// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`
Vue.use(VueAuth, auth)
//Vue.use(require('vue-resource'));

Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));
//Vue.router=router;
// Load Index
//Vue.component('index', Index)

const app = new Vue({
  el: '#app',
  components: { App },
  router,
});
