const mal = require('./malFetch')
const spyXFamilyID = 50265
const gintamaID = 918
const badAnimeID = 99999

test('Fetches Anime default title from Jikan MAL API', async () => {
    const anime = await mal.fetchAnimeByID(spyXFamilyID)
    expect(anime.data.title).toMatch("Spy x Family")
})

test('Fetches Anime title in Japanese from Jikan MAL API', async () => {
    const anime = await mal.fetchAnimeByID(gintamaID)
    expect(anime.data.title_japanese).toMatch("銀魂")
})

test('Returns 404 error on Anime not found through Jikan MAL API', async () => {
    const anime = await mal.fetchAnimeByID(badAnimeID)
    expect(anime.status).toBe(404)
})