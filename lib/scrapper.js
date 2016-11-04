const { env } = require('jsdom')
const fetch = require('isomorphic-fetch')

function jsdomPromise(html) {
  return new Promise((resolve, reject) => {
    env(html, [], (error, window) => {
      if(error) return reject(error)
      return resolve(window)
    })
  })
}

async function scrapper(){
  const url = 'https://news.ycombinator.com'
  const response = await fetch(url)
  const html = await response.text()
  const window = await jsdomPromise(html)
  const { document } = window

  const list = Array.from(document.querySelectorAll('.athing'))
    .map( athing => {
      const title = athing.querySelector('.storylink').innerHTML
      const rank = athing.querySelector('.rank').innerHTML
      const athingUrl = athing.querySelector('.storylink').getAttribute('href')
      return {title, rank, athingUrl}
    })

  return {news: list}

}

module.exports = scrapper
