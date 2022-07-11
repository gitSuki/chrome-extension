const jikanAPIURL = 'https://api.jikan.moe/v4'
const fetch = require('node-fetch')
module.exports = { fetchAnimeByID };

async function fetchAnimeByID(ID){
    // fetches data from Jikan MAL API based on the anime ID argument given
    try {
        const response = await fetch(jikanAPIURL + "/anime/" + ID);
        const data = await response.json();
        return data;
    } catch(error) {
        return error;
    }
}