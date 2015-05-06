/**
 * Server
 * ======
 *
 * Webserver handling the routes.
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
      // lyrics(req.params.text).then(digimeo).then((suggestions) => reply(suggestions))
      lyrics(req.params.text).then(digimeo).then(reply)
    }
  })

  server.route({
    method: 'GET',
    path: '/audio/chromaprint/{code}',
    handler (req, reply) {
      // acoustid(req.params.code).then(digimeo).then((suggestions) => reply(suggestions))
      acoustid(req.params.code).then(digimeo).then(reply)
    }
  })

  server.route({
    method: 'GET',
    path: '/text/echoprint/{code}',
    handler (req, reply) {
      // mooma(req.params.code).then(digimeo).then((suggestions) => reply(suggestions))
      mooma(req.params.code).then(digimeo).then(reply)
    }
  })

  server.start(() => console.log('[SERVER] - %s', config.server.address || server.info.uri))
})
