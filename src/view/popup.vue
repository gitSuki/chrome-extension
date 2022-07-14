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
let kitsunekkoData = []

async function getKitsunekkoData(){
  // pulls cached kitsunekko data
  chrome.storage.local.get(['kitsunekkoCache'], result => {
    kitsunekkoData = result.kitsunekkoCache
  })
  if (kitsunekkoData == null) kitsunekkoData = await kitsunekko.getData()
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
      chrome.runtime.sendMessage("Current data:")
      chrome.runtime.sendMessage(kitsunekkoData)
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
