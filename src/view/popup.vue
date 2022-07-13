<template>
  <div id="main-app">
    <Title :text="msg"/>
    <Searchbar/>
  </div>
</template>

<script>
export default {
  name: 'popupView',
  data () {
    return {
      msg: 'Hello World'
    }
  }
}
</script>

<style>
#main-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 400px;
}
</style>
