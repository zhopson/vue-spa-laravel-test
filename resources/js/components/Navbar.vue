<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-info mb-2">
    <div class="container">
      <!-- <a href="#" class="navbar-brand">Users</a> -->
      <router-link class="navbar-brand" :to="{ name: 'home' }">Home</router-link>
      <ul class="navbar-nav mr-auto"></ul>
      <ul class="navbar-nav">
        <li v-if="$auth.check()" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $auth.user().name }}</a> <!-- {{ getname }} -->
          <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
            <a class="dropdown-item" :href="'/users/'+$auth.user().id+'/edit'">Редактировать мои данные</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click.prevent="$auth.logout()">Выйти</a>
          </div>
        </li>
        <li v-if="!$auth.check()" class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
        </li>
        <li v-if="!$auth.check()" class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
//import auth from '../auth'
export default {
  data() {
      return {
          user_name: this.$auth.user().name // пусто
      };
  },
  mounted() {
    console.log("Component mounted:"+this.$auth.user().name);//Component mounted:undefined
  },
  created() {
    console.log("Component created:"+this.$auth);//Component created:[object Object]
  },
  computed: {
    // геттер вычисляемого значения
    getname: function () {
      // `this` указывает на экземпляр vm
      return this.$auth.user().name
    }
  }
};
</script>
