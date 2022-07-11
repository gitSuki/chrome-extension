const jikanjs = require('@mateoaranda/jikanjs');
module.exports = { fetchByID };

async function fetchByID(animeID) {
    // fetches data from Jikan MAL API based on the anime ID argument given
    try {
        const response = await jikanjs.loadAnime(animeID)
        const data = await response
        return data
    } catch (error) {
        return error
    }
}