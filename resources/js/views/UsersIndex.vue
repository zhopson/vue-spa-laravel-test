<template>
  <div class="users">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
        <p>{{ error }}</p>
        <p>
            <button @click.prevent="fetchData">
                Try Again
            </button>
        </p>
    </div>

    <ul v-if="users">
      <li v-for="{id, name, email } in users">
        <strong>Name:</strong> {{ name }},
        <strong>Email:</strong> {{ email }}
        <router-link :to="{ name: 'users.edit', params: { id } }">Edit</router-link>
      </li>
    </ul>
    <div>
        <router-link :to="{ name: 'users.create' }">Add User</router-link>
    </div>
  </div>
</template>
<script>
//import axios from 'axios';
//import api from "../api/users";
export default {
  data() {
    return {
      loading: false,
      users: null,
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.users = null;
      this.loading = true;

        this.$http({
          url: `auth/users_all`,
          method: 'GET'
        })
        .then(response => {
        //   this.users = response.data; for use without DB
        this.users = response.data.data;
          this.loading = false;
//          console.log(response);
        }).catch(error => {
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
    }
  }
}
</script>
