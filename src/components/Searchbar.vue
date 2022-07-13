<template>
  <form>
    <div>
      <input type="radio" id="myanimelist" name="destination">
      <label for="myanimelist">MyAnimeList</label>
      <input type="radio" id="anilist" name="destination">
      <label for="anilist">Anilist</label>
      <input type="radio" id="kitsunekko" name="destination">
      <label for="kitsunekko">Kitsunekko</label>
    </div>
    <input type="text" @keypress="onKeypress()" v-model="input" placeholder="Search for an Anime...">

    <div v-for="animeTitle in filteredAnimeList()" :key="animeTitle">
      <p>{{animeTitle}}</p>
    </div>
    <div class="item error" v-if="input&&!filteredAnimeList().length">
      <p>No results found!</p>
    </div>
  </form>
</template>


<script>
import { ref } from "vue"
let input = ref("");
const animes = ["Spy x Family", "Ya Boy Kongming", "Schwarzesmarken"];

function filteredAnimeList() {
  return animes.filter((anime) =>
    anime.toLowerCase().includes(input.value.toLowerCase())
  );
}

function onKeypress(){
  this.animes = filteredAnimeList()
}

export default {
  name: 'Searchbar',
  data() {
    return {
      input: input,
      animes: animes
    }
  },
  methods: {
    filteredAnimeList: filteredAnimeList,
    onKeypress: onKeypress
  }
}
</script>