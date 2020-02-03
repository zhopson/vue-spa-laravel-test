import axios from 'axios';
// import VueAxios from 'vue-axios'
// import Vue from 'vue'
// import VueAuth from '@websanova/vue-auth'
// import auth from '../auth'

// // Set Vue authentication
// Vue.use(VueAxios, axios)
// //axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`
// Vue.use(VueAuth, auth)

const client = axios.create({
  baseURL: '/api/auth',
});

export default {
  all(params) {
    return client.get('users_all', params);
  },
  all_pag(params) {
    return client.get('users', params);
  },
  find(id) {
    return client.get(`users/${id}`);
  },
  create(data) {
    return client.post('users', data);
  },
  update(id, data) {
    return client.put(`users/${id}`, data);
  },
  delete(id) {
    return client.delete(`users/${id}`);
  },
};
