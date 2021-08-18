<style lang="scss" scoped>
$red: lighten(red, 30%);
$darkRed: darken($red, 50%);
.form-group label {
  display: block;
}
.alert {
  background: $red;
  color: $darkRed;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 50%;
  border: 1px solid $darkRed;
  border-radius: 5px;
}
</style>

<template>
  <div>
    <div v-if="message" class="alert">{{ message }}</div>
    <div v-if="! loaded">Loading...</div>
    <form @submit.prevent="onSubmit($event)" v-else>
      <div class="form-group">
        <label for="user_name">Name</label>
        <input id="user_name" v-model="user.name" />
      </div>
      <div class="form-group">
        <label for="user_email">Email</label>
        <input id="user_email" type="email" v-model="user.email" />
      </div>
      <div class="form-group">
        <button type="submit" :disabled="saving">Update</button>
        <button @click.prevent="onCancel_update">Cancel</button>
        <button :disabled="saving" @click.prevent="onDelete">Delete</button>
      </div>
    </form>
  </div>
</template>
<script>
//import api from "../api/users";

export default {
  data() {
    return {
      message: null,
      loaded: false,
      saving: false,
      user: {
        id: null,
        name: "",
        email: ""
      }
    };
  },
  methods: {
    onSubmit(event) {
      this.saving = true;

    //   api
    //     .update(this.user.id, {
    //       name: this.user.name,
    //       email: this.user.email
    //     })
      this.$http({
        url: 'auth/users/'+ this.user.id,
        method: 'PUT',
        params:{
           name: this.user.name,
           email: this.user.email
         }
      })
        .then(response => {
          this.message = "User updated";
          setTimeout(() => (this.message = null), 2000);
          this.user = response.data.data;
          setTimeout(() => this.$router.push({ name: "users.index" }), 2000);
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => (this.saving = false));
      //.then(() => this.$router.push({ name: 'users.index' }));
    },
    onCancel_update() {
      this.$router.push({ name: "users.index" });
    },
    onDelete() {
      this.saving = true;

    //   api.delete(this.user.id)
      this.$http({
        url: 'auth/users/'+ this.user.id,
        method: 'DELETE',
      })
      .then(response => {
        //console.log(response);
        this.message = 'User Deleted';
        setTimeout(() => this.$router.push({ name: 'users.index' }), 2000);
      });
    },
  },
  created() {
      let vm = this;
    // api.find(this.$route.params.id)
      this.$http({
        url: 'auth/users/'+ vm.$route.params.id,
        method: 'GET'
      })
      .then(response => {
      setTimeout(() => {
        vm.loaded = true;
        vm.user = response.data.data;
      }, 3000);
    }).catch((err) => {
       vm.$router.push({ name: '404' });
     });
  }
};
</script>
