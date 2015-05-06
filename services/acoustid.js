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
export default function acoustid (code) {
  return getData('http://api.acoustid.org/v2/lookup', {
    client: services.acoustid,
    fingerprint: code,
    meta: 'recordings'
    // duration ?
  }).then(function (body) {
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
