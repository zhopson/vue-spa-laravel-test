<template>
  <div class="users">
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <p>
        <button @click.prevent="fetchData">Try Again</button>
      </p>
    </div>
    <div>
      <router-link :to="{ name: 'users.create' }">Add User</router-link>
    </div>

    <div class="card-deck" v-if="users">
      <div class="card text-blue mb-3" style="min-width: 18rem;" v-for="{id, name, email } in users" >
        <div class="card-header">{{ id }}</div>
        <div class="card-body">
          <h5 class="card-title">{{ name }}</h5>
          <p
            class="card-text"
          >{{ email }}</p>
        </div>
        <div class="card-footer">
          <router-link :to="{ name: 'users.edit', params: { id } }">Edit</router-link>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import AppVue from './App.vue';
//import axios from 'axios';
//import api from "../api/users";
export default {
  data() {
    return {
      loading: false,
      users: null,
      error: null,
      card_title : 'Users Index'
    };
  },
  created() {
    //AppVue.card_title = 'users index'
    this.$parent.card_title = this.card_title;
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.users = null;
      this.loading = true;

      this.$http({
        url: `auth/users_all`,
        method: "GET"
      })
        .then(response => {
          //   this.users = response.data; for use without DB
          this.users = response.data.data;
          this.loading = false;
          //          console.log(response);
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });

      //       api.all()
      //         .then(response => {
      //         //   this.users = response.data; for use without DB
      //         this.users = response.data.data;
      //           this.loading = false;
      // //          console.log(response);
      //         }).catch(error => {
      //             this.loading = false;
      //             this.error = error.response.data.message || error.message;
      //         });
    },
    // setTitle () {
    //     console.log('set', this.card_title);
    //     this.$emit('setTitle', {
    //         title: this.card_title
    //     })
    // }
  }
};
</script>
