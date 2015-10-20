/**
 * tunefind
 * ========
 *
 * Retrieve information of songs in movies and series.
 *
 * Service: http://www.tunefind.com
 */

import { Client } from 'tunefind'

import { TUNEFIND } from '../../credentials'

var client = new Client({
	credentials: TUNEFIND
})


/**
 * Retrieve information for songs in movies and shows
 *
 * @param  {String} type    -
 * @param  {String} title   -
 * @param  {Number} season  -
 * @param  {Number} episode -
 */
export default ({ type, title, season, episode }) => {

	// movie
	if (type === 'movie') {
		return client.movies().then((movies) => {
			const { id } = movies.find((movie) => movie.name.toLowerCase().includes(title.toLowerCase()))
			return client.movie(id).then((movie) => {
				const songs = movie.songs.map(defineSong)
				return songs
			})
		})
	}

	// show
	return client.episode(title, season, episode).then((episode) => {
		const songs = episode.songs.map(defineSong)
		return songs
	})

	/**
	 * [defineSong description]
	 * @param {String} song -
	 */
	function defineSong (song) {
		return {
			artist: song.artist.name,
			title: song.name,
			scene: song.scene.length ? song.scene : null
		}
	}
}
