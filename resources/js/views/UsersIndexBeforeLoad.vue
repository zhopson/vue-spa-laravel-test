<template>
  <div class="users">
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <ul v-if="users">
      <li v-for="{ id, name, email } in users" v-bind:key="id">
        <strong>Name:</strong>
        {{ name }},
        <strong>Email:</strong>
        {{ email }}
        <router-link :to="{  name: 'users.edit', params: { id } }">Edit</router-link>
      </li>
    </ul>

    <div class="pagination">
        <pagination :data="users.data" @pagination-change-page="getUsers"></pagination>
    </div>
    <div>
      <router-link :to="{ name: 'users.create' }">Add User</router-link>
    </div>
  </div>
</template>
<script>
//import pagination from 'laravel-vue-pagination';
export default {
  data() {
    return {
      users: {},
      error: null
    };
  },
  computed: {
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers : function(page){
                if (typeof page === 'undefined') {
                    page = 1;
                }

      //  api.all_pag()
      this.$http.get('auth/users?page='+page)
                    .then(response => {
                        return response.data.data
                    }).then(data => {
                        this.users = data;
                    });
    },

  }
};
</script>

