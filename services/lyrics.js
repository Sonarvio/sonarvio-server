/**
 * Lyrics
 * ======
 *
 * Retrieve a set of lyrics containing the provided query.
 *
 * Service: http://www.lyrics.net
 */

import cheerio from 'cheerio';
import {getData} from '../utilities/network'

/**
 * [lyrics description]
 *
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
export default function lyrics (text) {
  return getData(`http://www.lyrics.net/lyrics/${text}`).then(function (body) {
    var $ = cheerio.load(body)
    var matches = $('#content-body .sec-lyric').map(function () {
      var $lyric = $(this)
      return {
        title: $lyric.find('.lyric-meta-title').text(),
        artist: $lyric.find('.lyric-meta-artists').text()
      }
    }).get()
    // TODO:
    // - reduce duplicates
    // matches = matches.filter(function (match, i, arr) {
    //   return arr.find(function (entry) {
    //     return entry.artist.toLowerCase() === match.artist.toLowerCase();
    //   });
    // });
    return Promise.resolve(matches)
  })
}
