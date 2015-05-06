/**
 * Server
 * ======
 *
 * Webserver handling the routes requesting data.
 */

import Hapi from 'hapi'

import digimeo from './services/digimeo'
import lyrics from './services/lyrics'
import acoustid from './services/acoustid'
import mooma from './services/mooma'

import config from './config'

var server = new Hapi.Server({/** options **/})

server.connection(config.server)

server.register([], function (err) {
  if (err) {
    throw err
  }

  server.route({
    method: 'GET',
    path: '/text/lyrics/{text}',
    handler (req, reply) {
      var params = req.params
      var service = null
      switch (params.service) {
        case 'lyrics':
        default:
          service = lyrics
      }
      service(params.text)
        .then(digimeo)
          .then(reply)
          .catch(reply)
    }
  })

  server.route({
    method: 'GET',
    path: '/audio/chromaprints/{code}',
    handler (req, reply) {
      var params = req.params
      var service = null
      switch (params.service) {
        case 'acoustid':
        default:
          service = acoustid
      }
      service(req.params.code)
        .then(digimeo)
          .then(reply)
          .catch(reply)
    }
  })

  server.route({
    method: 'GET',
    path: '/audio/echoprints/{code}',
    handler (req, reply) {
      var params = req.params
      var service = null
      switch (params.service) {
        case 'mooma':
        default:
          service = mooma
      }
      service(params.code)
        .then(digimeo)
          .then(reply)
          .catch(reply)
    }
  })

  server.start(() => console.log('[SERVER] - %s', config.server.address || server.info.uri))
})
