<template>
  <div>
    <h1>Vue Router Demo App</h1>

    <p>
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'hello' }">Hello World</router-link> |
      <router-link :to="{ name: 'admin_hello' }">Admin Hello World</router-link> |
      <router-link :to="{ name: 'users.index_all' }">Users All</router-link> |
      <router-link :to="{ name: 'users.index' }">Users Paginate</router-link>
    </p>
            <p v-if="$auth.check()">
                <a href="#" @click.prevent="$auth.logout()">Logout</a> |
                user: {{ $auth.user().name }} |
                is_admin: {{ $auth.user().is_admin }}
            </p>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
