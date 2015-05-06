/**
 * Acoustid
 * ========
 *
 * Retrieve matches for 'chromaprints'.
 *
 * Service: https://acoustid.org/webservice
 */

import {getData} from '../utilities/network'
import {services} from '../config';

/**
 * [acoustid description]
 *
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
export default function acoustid (code, service = null) {
  var lookup = null
  switch (service) {
    case 'acoustid':
    default:
      lookup = getData('http://api.acoustid.org/v2/lookup', {
        client: services.acoustid,
        fingerprint: code,
        meta: 'recordings'
        // duration ?
      })
  }
  return lookup.then(function (body) {
    // results, recording ?
    var records = body.results[0].recordings.map(function (record) {
      return {
        title: record.title,
        artist: record.artists.map((artist) => artist.name).join(' ')
      }
    })
    return Promise.resolve(records)
  })
}
