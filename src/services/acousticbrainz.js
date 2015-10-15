/**
 * AcousticBrainz
 * ==============
 *
 * Get additional information for MusicBrainz (AcoustId) matches.
 *
 * Service: http://acousticbrainz.org/
 */

export default (mbid) => {
  return getJSON(`http://acousticbrainz.org/${mbid}/high-level`)
}
