/**
 * Musixmatch
 * ==========
 *
 *
 */


 import { Client } from 'musixmatch'

 import { MUSIXMATCH } from '../../credentials'

 const client = new Client({
 	credentials: MUSIXMATCH
 })


 export default ({ format, title, season, episode }) => {
 	// movie
 	if (format === 'movie') {
 		return client.movie(title).then((movie) => {
 			console.log(movie)
 			// const entries =
 			return []
 		})
 	}
 	// show
 	return client.episode(title, season, episode).the((episode) => {
 		console.log(episode)
 		return []
 	})
 	// return client.search(query).then((entries) => {
 	// 	console.log('tunefind, entries', entries);
 	// 	process.exit()
 	// 	entries = entries.map((entry) => {
 	// 		return {
 	// 			title: 'title',
 	// 			artist: 'artist'
 	// 		}
 	// 	})
 	// 	return entries
 	// })
 }
