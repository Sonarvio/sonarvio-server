/**
 * MooMa
 * =====
 *
 * Retrieve matches for 'echoprints'.
 *
 * Service: http://www.mooma.sh/api.html
 */

import {getData} from '../utilities/network'
import {services} from '../config'

/**
 * [mooma description]
 *
 *  TODO:
 *  - allow selecting different service provider
 *
 * @param  {[type]} code    [description]
 * @param  {[type]} service [description]
 * @return {[type]}         [description]
 */
export default function mooma (code) {
  return getData('http://api.mooma.sh/v1/song/identify', {
    code,
    api_key: services.mooma
  }).then(function (body) {
    var songs = body.response.songs.map(function (song) {
      return {
        title: song.title,
        artist: song.artist_name
      }
    })
    return Promise.resolve(songs)
  })
}
