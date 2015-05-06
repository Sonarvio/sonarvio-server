/**
 * digimeo
 * =======
 *
 * Retrieve details about songs.
 *
 * Service: http://www.digimeo.de
 */

import Promise from 'bluebird'
import {getData} from '../utilities/network'

/**
 * [digimeo description]
 *
 * @param  {[type]} matches [description]
 * @param  {[type]} count   [description]
 * @return {[type]}         [description]
 */
export default function digimeo (matches, count = null) {
  if (Array.isArray(matches)) {
    count = 1
  } else {
    matches = [matches]
  }
  return Promise.map(matches, function (match) {
    return getData('https://www.digimeo.de/api/v1/search/music', {
      count,
      types: 'song',
      q: `${match.artist} ${match.title}`
    }).then(function (body) {
      var data = null
      // TODO:
      // - currently got 2 ways of returning 0 matches, pick one and fix the other !
      // []
      if (!body.results[0]) {
        console.error('MISSING RESULTS', match, body)
      }
      // [{category: 'music', products: [] }]
      if (body.results[0] && body.results[0].products.length) {
        data = body.results[0].products[0]
        data = {
          link: `https://www.digimeo.de/detail/music/${data.general.id}`,
          title: data.general.title,
          cover: data.general.image,
          release: data.general.release,
          artist: data.specific.artists.join(', '),
          preview: data.specific.preview
        }
      }
      return Promise.resolve(data)
    })
  }).then(function (results) {
    results = results.filter(function (result, i, arr) {
      return result
      // TODO:
      // - prevent duplicates
      // && arr.findIndex(function (prev) {
      //   return prev.link === result.link
      // }) === -1
    })
    return Promise.resolve(results)
  })
}
