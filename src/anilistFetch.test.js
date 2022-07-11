const anilist = require('./anilistFetch')
const gingaEiyuuDensetsuID = 820
const suzumiyaID = 7311
const badAnimeID = 99999

test('Fetches Anime episode count from anilist API', async () => {
    const anime = await anilist.fetchAnimeByID(anilist.query, {id: gingaEiyuuDensetsuID})
    expect(anime.episodes).toBe(110)
})

test('Fetches Anime japanese title from anilist API', async () => {
    const anime = await anilist.fetchAnimeByID(anilist.query, {id: suzumiyaID})
    expect(anime.title.native).toMatch("涼宮ハルヒの消失")
})

test('Returns 404 error on Anime not found through anilist API', async () => {
    const anime = await anilist.fetchAnimeByID(anilist.query, {id: badAnimeID})
    expect(anime.errors[0].status).toBe(404)
})