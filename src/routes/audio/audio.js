/**
 * Routes: Audio
 * =============
 *
 * TODO:
 * - add more acoustic fingerprint implementations to choose from
 */

import acoustid from '../../services/acoustid'
import digimeo from '../../services/digimeo'


export default (server) => {
	server.route({
		method: 'GET',
		path: '/audio',
		handler (req, reply) {
			const { type = 'chromaprint', code } = req.query
			if (!code) {
				return reply(new Error('Missing query parameter "code"!'))
			}
			return acoustid(code).then(digimeo).then(reply).catch((err) => {
				console.error(err)
				return reply(err)
			})
		}
	})
}
