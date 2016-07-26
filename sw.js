/* eslint no-undef: 0 */
importScripts('/node_modules/sw-toolbox/sw-toolbox.js');

toolbox.options.debug = true;

toolbox.precache(['/index.html', 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/*']);

toolbox.router.get('/index.html', toolbox.networkFirst);
toolbox.router.get('https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/*', toolbox.fastest);
