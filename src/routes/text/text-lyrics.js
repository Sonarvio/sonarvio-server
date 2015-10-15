/**
 * Routes: Text - Lyrics
 * =====================
 *
 * TODO:
 * - include musixmatch till limit reached - than provide 'lyrics' fallback provder
 */

import lyrics from '../../services/lyrics'
import digimeo from '../../services/digimeo'


export default (server) => {
	server.route({
		method: 'GET',
		path: '/text/lyrics',
		handler (req, reply) {
			const { query } = req.query
			if (!query) {
				return reply(new Error('Missing query parameter "query"!'))
			}
			return lyrics(query).then(digimeo).then(reply).catch((err) => {
				console.error(err)
				reply(err)
			})
		}
	})
}
