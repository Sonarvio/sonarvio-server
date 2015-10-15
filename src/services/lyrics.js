/**
 * Lyrics
 * ======
 *
 * Retrieve a set of lyrics containing the provided query.
 *
 * Service: http://www.lyrics.net
 */

import cheerio from 'cheerio'

import { getRAW } from '../utilities/network'


/**
 * [lyrics description]
 *
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
export default (query) => {
  return getRAW(`http://www.lyrics.net/lyrics/${query}`).then((body) => {
    const $ = cheerio.load(body)
    var matches = $('#content-body .sec-lyric').map((i, el) => {
      const $lyric = $(el)
      return {
        artist: $lyric.find('.lyric-meta-artists').text(),
        title: $lyric.find('.lyric-meta-title').text()
      }
    }).get()
    // TODO:
    // - reduce duplicates
    // matches = matches.filter(function (match, i, arr) {
    //   return arr.find(function (entry) {
    //     return entry.artist.toLowerCase() === match.artist.toLowerCase();
    //   });
    // });
    return matches
  })
}
