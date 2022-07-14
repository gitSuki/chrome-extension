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
const kitsunekkoURL = 'https://kitsunekko.net/dirlist.php?dir=subtitles%2Fjapanese%2F';
const kitsunekkoBaseURL = 'https://kitsunekko.net';

async function fetchKitsunekkoData(){
  const response = await fetch(kitsunekkoURL)
  const data = await response.text()
  chrome.runtime.sendMessage("New data fetched")
  return data
} 

function parseKitsunekkoData(data){
  // convert the data to HTML to traverse with DOM methods
  const HTML = document.createElement('html');
  HTML.innerHTML = data;
  const rows = HTML.getElementsByTagName('tr');
  let subsDict = [...rows].map(tr => ({
    'title': tr.firstChild.textContent,
    'href': kitsunekkoBaseURL + tr.firstChild.firstChild.pathname + tr.firstChild.firstChild.search,
    'lastUpdated': tr.children[1].title
  }));
  chrome.runtime.sendMessage("New data parsed")
  return subsDict;
}

function cacheKitsunekkoData(data){
  chrome.storage.local.set({kitsunekkoCache: data});
  chrome.runtime.sendMessage(data)
  chrome.runtime.sendMessage("New data saved")
}

function getKitsunekkoDataCache(){
  chrome.storage.local.get(['kitsunekkoCache'], result => {
    chrome.runtime.sendMessage(result)
    chrome.runtime.sendMessage("Cache data retrieved")
  });
}


async function getKitsunekkoData(){
  chrome.runtime.sendMessage("Main start")
  const data = await fetchKitsunekkoData()
  const parsedData = parseKitsunekkoData(data)
  cacheKitsunekkoData(parsedData)
  chrome.runtime.sendMessage("Main complete")
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
