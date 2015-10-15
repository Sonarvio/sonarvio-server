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


export default ({ format, title, season, episode }) => {
	// movie
	if (format === 'movie') {
		return client.movie(title).then((movie) => {
			const songs = movie.songs.map(defineSong)
			return songs
		})
	}
	// show
	return client.episode(title, season, episode).then((episode) => {
		const songs = episode.songs.map(defineSong)
		return songs
	})

	/**
	 * [defineSong description]
	 * @param  {[type]} song [description]
	 * @return {[type]}      [description]
	 */
	function defineSong (song) {
		return {
			artist: song.artist.name,
			title: song.name,
			scene: song.scene.length ? song.scene : null
		}
	}
}
