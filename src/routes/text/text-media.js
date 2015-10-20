/**
 * Routes: Text - Lyrics
 * =====================
 *
 * TODO:
 * - add more media types aside of movies and TV shows
 */

import tunefind from '../../services/tunefind'
import digimeo from '../../services/digimeo'


/**
 * [default description]
 *
 * @param  {[type]} server [description]
 * @return {[type]}        [description]
 */
export default (server) => {
	server.route({
		method: 'GET',
		path: '/text/media',
		handler (req, reply) {
			const { type, query: title, season, episode } = req.query
			if (!type) {
				return reply(new Error('Missing query parameter "type"!'))
			}
			if (!title) { // alias
				return reply(new Error('Missing query parameter "query"!'))
			}
			return tunefind({	type, title, season, episode }).then(digimeo).then(reply).catch((err) => {
				console.error(err)
				reply(err)
			})
		}
	})
}
