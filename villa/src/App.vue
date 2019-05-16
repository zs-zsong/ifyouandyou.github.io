<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "./components/Nav"
import "../static/reset.css"
import "../static/font.css"
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
#app{
  padding-bottom: 96px;
}
</style>
