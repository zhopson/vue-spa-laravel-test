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
        <router-link :to="{ name: 'users.edit', params: { id } }">Edit</router-link>
      </li>
    </ul>

    <div class="pagination">
      <button :disabled =  "!pagination.prev_page_url" @click.prevent="getUsers(pagination.prev_page_url)">Previous</button>
      Page {{ pagination.current_page }} of {{ pagination.last_page }}
      <button :disabled =  "!pagination.next_page_url" @click.prevent="getUsers(pagination.next_page_url)">Next</button>
      <br />
      {{ totalCount }}
    </div>
    <div>
      <router-link :to="{ name: 'users.create' }">Add User</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: null,
      meta: null,
      error: null,
      pagination : {}
    };
  },
  computed: {
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
    this.getUsers();
  },

  methods: {
    getUsers : function(page_url){
        let vm = this;
      page_url = page_url || 'auth/users'

      //  api.all_pag()
      this.$http({
        url: page_url,
        method: 'GET'
      })
        .then(response => {
          this.users = response.data.data;
          vm.makePagination(response.data.meta,response.data.links);
        })
        .catch(error => {
          console.log(error);
          this.error = error;
        });

    },
        makePagination(meta,links){
            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                next_page_url: links.next,
                prev_page_url: links.prev
            }
            this.pagination = pagination;
        },
  }
};
</script>

