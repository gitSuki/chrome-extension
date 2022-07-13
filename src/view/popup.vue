<template>
  <div id="main-app">
    <div id="header">
      <Title :title="headerTitle"/>
      <Searchbar/>
      <Button @generate-kitsunekko-data="generateKitsunekkoData()"/>
    </div>
  </div>
</template>

<script>
const kitsunekkoURL = 'https://kitsunekko.net/dirlist.php?dir=subtitles%2Fjapanese%2F';

export default {
  name: 'popupView',
  data () {
    return {
      headerTitle: 'Anime JPSub Finder'
    }
  },
  methods: {
    generateKitsunekkoData(){
      chrome.runtime.sendMessage(kitsunekkoURL);
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
