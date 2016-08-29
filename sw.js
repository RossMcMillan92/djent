/* eslint no-undef: 0 */
importScripts('/node_modules/sw-toolbox/sw-toolbox.js');
toolbox.options.debug = false;
console.log('TOOLBOX', toolbox)

toolbox.precache([
    '/index.html',
    '/dist/*',
    'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/*',
]);

toolbox.router.get('/index.html', toolbox.networkFirst);
toolbox.router.get('/assets/(.*)', toolbox.fastest);
toolbox.router.get('/dist/(.*)', toolbox.networkFirst);
toolbox.router.get('https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/(.*)', toolbox.fastest);

toolbox.router.get('/css(.*)', self.toolbox.fastest, {
    origin: /fonts\.googleapis\.com/,
    cache: {
        name: 'dynamic-vendor-cache-v1',
        maxEntries: 5
    }
});
