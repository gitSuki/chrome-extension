const fetch = require('node-fetch')
const anilistAPIUrl = 'https://graphql.anilist.co'
const query = `
query getAnimeInfoByID($id: Int) {
  Media (id: $id, type: ANIME) { 
    id
    siteUrl
    episodes
    duration
    seasonYear
    title {
      romaji
      english
      native
    }
  }
}`
module.exports = { query, fetchAnimeByID }

async function fetchAnimeByID(query, animeID) {
  // fetches data from anilist API based on the query argument given
  try {
    const response = await fetch(anilistAPIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: animeID
      })
    })
    const data = await handleResponse(response)
    return data.data.Media
  } catch (error) {
    return error
  }
}

function handleResponse(response) {
  return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
  });
}