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
const kitsunekkoBaseURL = 'https://kitsunekko.net';

export default {
  name: 'popupView',
  data () {
    return {
      headerTitle: 'Anime JPSub Finder'
    }
  },
  methods: {
    async generateKitsunekkoData(){
      // gathers html data from Kitsunekko
      const response = await fetch(kitsunekkoURL)
      const data = await response.text()
      // parse through the HTML data 
      const kitsunekkoHTML = document.createElement('html');
      kitsunekkoHTML.innerHTML = data;
      const animeRows = kitsunekkoHTML.getElementsByTagName('tr');
      let subsDict = [...animeRows].map(tr => ({
        'animeTitle': tr.firstChild.textContent,
        'href': kitsunekkoBaseURL + tr.firstChild.firstChild.pathname + tr.firstChild.firstChild.search,
      }));
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
