<template>
  <div id="main-app">
    <div id="header">
      <Title :title="headerTitle"/>
      <Searchbar/>
      <Button @click="onclick()"/>
    </div>
  </div>
</template>

<script>
const kitsunekko = require('../entry/kitsunekko.js')

async function getKitsunekkoData(){
  const data = await kitsunekko.fetchData()
  const parsedData = kitsunekko.parseData(data)
  kitsunekko.cacheData(parsedData)
}

getKitsunekkoData()

export default {
  name: 'popupView',
  data () {
    return {
      headerTitle: 'Anime JPSub Finder',
    }
  },
  methods: {
    onclick(){
      chrome.runtime.sendMessage("Click!")
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
