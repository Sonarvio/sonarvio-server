/**
 * Routes: Text - Lyrics
 * =====================
 *
 * TODO:
 * - add more media types aside of movies and TV shows
 */

import tunefind from '../../services/tunefind'
import digimeo from '../../services/digimeo'


export default (server) => {
	server.route({
		method: 'GET',
		path: '/text/media',
		handler (req, reply) {
			const { format, title, season, episode } = req.query
			if (!format) {
				return reply(new Error('Missing query parameter "format"!'))
			}
			if (!title) {
				return reply(new Error('Missing query parameter "title"!'))
			}
			return tunefind({	format, title, season, episode }).then(digimeo).then(reply).catch((err) => {
				console.error(err)
				reply(err)
			})
		}
	})
}
