'use strict'
const { parse } = require('url')
const scrapper = require('./lib/scrapper.js')

module.exports = async req => {
  // let { query } = parse(req.url, true)
  return scrapper()
}
