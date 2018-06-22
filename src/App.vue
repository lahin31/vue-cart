<template>
  <div>
      <app-navbar></app-navbar>
      <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components//Navbar.vue';


export default {
  name: "app",
  data() {
      return {
      }
  },
  components: {
    'app-navbar': Navbar
  }
}
</script>

<style>
body {
  margin: 0 auto;
  width: 90%;
  max-width: 1240px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f6f6f6;
}

h6 {
    color: #666;
    font-size: 14px;
}
</style>

