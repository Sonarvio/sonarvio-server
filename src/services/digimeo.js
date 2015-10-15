/**
 * digimeo
 * =======
 *
 * Retrieve details about songs.
 *
 * Service: http://www.digimeo.de
 */

import { getJSON } from '../utilities/network'


/**
 * [digimeo description]
 *
 * @param  {[type]} matches [description]
 * @param  {[type]} count   [description]
 * @return {[type]}         [description]
 */
export default (matches, count = null) => {
  if (Array.isArray(matches)) {
    count = 1
  } else {
    matches = [matches]
  }
  return Promise.all(matches.map((match) => {
    return getJSON('https://www.digimeo.de/api/v1/search/music', {
      types: 'song',
      q: `${match.artist} ${match.title}`,
      count
    }).then((body) => {
      var data = null
      // TODO:
      // - currently got 2 ways of returning 0 matches, pick one and fix the other !
      // []
      if (!body.results[0]) {
        // console.error('MISSING RESULTS', match, body)
        return null
      }
      // [{category: 'music', products: [] }]
      if (body.results[0] && body.results[0].products.length) {
        data = body.results[0].products[0]
        data = {
          ...match,
          link: `https://www.digimeo.de/detail/music/${data.general.id}`,
          title: data.general.title,
          cover: data.general.image,
          release: data.general.release,
          artist: data.specific.artists.join(', '),
          preview: data.specific.preview
        }
      }
      return data
    })
  }))
  .then((results) => {
    results = results.filter((result, i, arr) => {
      return result
      // TODO:
      // - prevent duplicates
      // && arr.findIndex(function (prev) {
      //   return prev.link === result.link
      // }) === -1
    })
    return results
  })
}
