<template>
  <div class="users">
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <ul v-if="users">
      <li v-for="{ id, name, email } in users">
        <strong>Name:</strong>
        {{ name }},
        <strong>Email:</strong>
        {{ email }}
        <router-link :to="{ name: 'users.edit', params: { id } }">Edit</router-link>
      </li>
    </ul>

    <div class="pagination">
      <button :disabled="! prevPage" @click.prevent="goToPrev">Previous</button>
      {{ paginatonCount }}
      <button :disabled="! nextPage" @click.prevent="goToNext">Next</button>
      <br />
      {{ totalCount }}
    </div>
    <div>
      <router-link :to="{ name: 'users.create' }">Add User</router-link>
    </div>
  </div>
</template>
<script>
//import { callbackify } from 'util';
//import axios from 'axios';
//import api from "../api/users";

// const getUsers = (page, callback) => {
//   const params = { page };
//     //var vm = app.methods.VueAuth_Http;
// //  api.all_pag()
//     //console.log('vm='+vm);
//     // vm.get_this.$http({
//     //       url:`auth/users`,
//     //       method:'GET'
//     // })
//     app.methods.VueAuth_Http(
//         `auth/users`,
//         'GET'
//     )
//     .then(response => {
//       callback(null, response.data);
//     }).catch(error => {
//       callback(error, error.response.data);
//     });
// };
//const vue_this = () => {return this};
export default {
  data() {
    return {
      users: null,
      meta: null,
      links: {
        first: null,
        last: null,
        next: null,
        prev: null
      },
      error: null
    };
  },
  computed: {
    nextPage() {
      if (!this.meta || this.meta.current_page === this.meta.last_page) {
        return;
      }

      return this.meta.current_page + 1;
    },
    prevPage() {
      if (!this.meta || this.meta.current_page === 1) {
        return;
      }

      return this.meta.current_page - 1;
    },
    paginatonCount() {
      if (!this.meta) {
        return;
      }

      const { current_page, last_page } = this.meta;

      return `${current_page} of ${last_page}`;
    },
    totalCount() {
      if (!this.meta) {
        return;
      }

      const total_records = this.meta.total;

      return `Total records: ${total_records}`;
    }
  },
  created() {
          console.log('page='+this.$route.query.page);

    this.getUsers(this.$route.query.page, (err, data) => {
      this.setData(err, data);
    });
  },
//   beforeRouteEnter(to, from, next) {
//       next(vm => {
//         vm.getUsers(to.query.page, (err, data) => {
//             next(vm => vm.setData(err, data));
//         });
//       })
//   },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
      //console.log('this='+this);
    this.users = this.links = this.meta = null;
    this.getUsers(to.query.page, (err, data) => {
      this.setData(err, data);
      next();
    });
  },
    // getUsers : function(page, callback){
    //   const params = { page };

    //   //  api.all_pag()
    //   this.$http({
    //     url: `auth/users`,
    //     method: "GET"
    //   })
    //     .then(response => {
    //       callback(null, response.data);
    //     })
    //     .catch(error => {
    //       callback(error, error.response.data);
    //     });
    // },
  methods: {
    getUsers : function(page, callback){
      const params = { page };

      //  api.all_pag()
      this.$http({
        url: `auth/users`,
        method: 'GET'
      })
        .then(response => {
          callback(null, response.data);
        })
        .catch(error => {
          callback(error, error.response.data);
        });
    },
    // VueAuth_Http: function(pUrl,pMethod) {
    //     this.$http({
    //       url: pUrl,
    //       method: pMethod
    //     })
    // },
    goToNext() {
      this.$router.push({
        query: {
          page: this.nextPage
        }
      }).catch(error => {
        if (error.name != "NavigationDuplicated") {
            throw error;
        }
      });
      },
    goToPrev() {
      this.$router.push({
        name: "users.index",
        query: {
          page: this.prevPage
        }
      });
    },
    setData(err, { data: users, links, meta }) {
      if (err) {
        this.error = err.toString();
      } else {
        this.users = users;
        this.links = links;
        this.meta = meta;
      }
    }
  }
};
</script>

