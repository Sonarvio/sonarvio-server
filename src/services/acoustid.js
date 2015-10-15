/**
 * Acoustid
 * ========
 *
 * Retrieve matches for 'chromaprints'.
 *
 * Service: https://acoustid.org/webservice
 */

import { getJSON } from '../utilities/network'
import { ACOUSTID } from '../../credentials'
import acousticbrainz from './acousticbrainz'


/**
 * [acoustid description]
 *
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
export default (code) => {
  return getJSON('http://api.acoustid.org/v2/lookup', {
    client: ACOUSTID.client,
    fingerprint: code,
    meta: 'recordings'
    // duration ?
  }).then((body) => {
    return Promise.all(body.results[0].recordings.map((recording) => {
      return acousticbrainz(recording.id).then(({ highlevel, meta }) => {
        console.log('meta', meta)
        return {
          artist: recording.artists.map((artist) => artist.name).join(' '),
          title: recording.title,
          highlevel,
          meta
        }
      })
    }))
  })
}
