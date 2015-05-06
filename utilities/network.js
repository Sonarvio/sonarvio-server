/**
 * Network
 * =======
 *
 * Helper for async communication.
 */

import Promise from 'bluebird'
import request from 'request'

/**
 * [getData description]
 *
 * Wrap a request into a promise.
 *
 * @param  {[type]} url [description]
 * @param  {[type]} qs  [description]
 * @return {[type]}     [description]
 */
// Promise.promisify(request.get)
export function getData (url, qs) {
  return new Promise(function (resolve, reject) {
    request.get({
      url,
      qs,
      json: true
    }, function (err, res, body) {
      if (err) {
        return reject(err)
      }
      return resolve(body)
    })
  })
}
