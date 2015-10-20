/**
 * Server
 * ======
 *
 * Webserver handling the routes requesting data.
 */

import 'babel/polyfill'

import { Server } from 'hapi'

const routes = [
  require('./routes/text/text-lyrics'),
  require('./routes/text/text-media'),
  require('./routes/audio/audio')
]

import config from '../config'


var server = new Server({/** options **/})

server.connection({
  host: 'localhost',
  port: config.port,
  // enable CORS - dev
  routes: {
    cors: {
      origin: ['*']
    }
  },
  // ignore trailing slash
  router: {
    stripTrailingSlash: true
  }
})

server.register([], function (err) {
  if (err) {
    throw err
  }

  routes.forEach((route) => route(server))

  server.start(() => {
    console.log('[SERVER] - %s', server.info.uri)
  })
})
