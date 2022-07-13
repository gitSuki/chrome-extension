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
    <input type="text" name="searchbar" id="searchbar" placeholder="Search for an Anime...">
  </form>
</template>

<script>
export default {
  name: 'Searchbar',
}
</script>