<template>
  <div class="container">
    <h1>Vue Router Demo App</h1>

<ul class="nav">
  <li class="nav-item">
    <a class="nav-link active" :href="'/'">Домой</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :href="'/hello'">Приветствие</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :href="'/admin_hello'">Приветствие Админу</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :href="'/users_all'">Список юзеров - Карточки</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :href="'/users'">Список юзеров - Пагинация</a>
  </li>
</ul>

    <!-- <p>
      <router-link :to="{ name: 'home' }">Home</router-link>|
      <router-link :to="{ name: 'hello' }">Hello World</router-link>|
      <router-link :to="{ name: 'admin_hello' }">Admin Hello World</router-link>|
      <router-link :to="{ name: 'users.index_all' }">Users All</router-link>|
      <router-link :to="{ name: 'users.index' }">Users Paginate</router-link>
    </p>
    <p v-if="$auth.check()">
      <a href="#" @click.prevent="$auth.logout()">Logout</a>
      |
      user: {{ $auth.user().name }} |
      is_admin: {{ $auth.user().is_admin }}
    </p> -->
    <div class="container">
      <div class="card">
        <div class="card-header">{{ card_title }}</div>
        <div class="card-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          card_title: 'Main window'
      };
  },
};
</script>
