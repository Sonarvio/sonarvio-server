/**
 * Network
 * =======
 *
 * Helper for async communication.
 */

import got from 'got'


/**
 * [getData description]
 *
 * Wrap a request into a promise.
 *
 * @param  {[type]} url [description]
 * @param  {[type]} qs  [description]
 * @return {[type]}     [description]
 */
export function getJSON (url, query, options = {}) {
  return send(url, {
    method: 'GET',
    json: true,
    query,
    ...options
  })
}

/**
 * [getRAW description]
 *
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function getRAW (url) {
  return send(url, {
    method: 'GET'
  })
}

/**
 * [getRAW description]
 *
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function send (url, options) {
  return got(url, options).then((response) => {
    return response.body
  })
}
