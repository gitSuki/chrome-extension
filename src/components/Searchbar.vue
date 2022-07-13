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
    <div v-for="anime in filteredList()" :key="anime">
      <p>{{anime}}</p>
    </div>
    <div class="item error" v-if="input&&!filteredList().length">
      <p>No results found!</p>
    </div>
  </form>
</template>


<script>
import { ref } from "vue"
let input = ref("");
const animes = ["Spy x Family", "Ya Boy Kongming", "Schwarzesmarken"];

function filteredList() {
  return animes.filter((anime) =>
    anime.toLowerCase().includes(input.value.toLowerCase())
  );
}

function onKeypress(){
  this.animes = filteredList()
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
    onKeypress: onKeypress,
    filteredList: filteredList
  }
}
</script>