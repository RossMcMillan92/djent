/* eslint no-undef: 0 */
/* eslint strict: 0 */

((global) => {
    'use strict'

    // Load the sw-toolbox library.
    importScripts('node_modules/sw-toolbox/sw-toolbox.js')

    global.toolbox.options.debug = false
    global.toolbox.router.default = global.toolbox.fastest

    // The route for any requests from the googleapis origin
    toolbox.router.get('/(.*)', global.toolbox.fastest, {
        origin: /\.googleapis\.com$/
    })

    // The route for the assets
    toolbox.router.get('/', global.toolbox.networkFirst)
    toolbox.router.get('sw.js', global.toolbox.networkFirst)

    // Ensure that our service worker takes control of the page as soon as possible.
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()))
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()))
})(self)
