/* eslint no-undef: 0 */
console.log('IMPORTSCRIPTS', importScripts)
importScripts('/node_modules/sw-toolbox/sw-toolbox.js')
    .catch(e => console.log(e));

// toolbox.options.debug = true;

toolbox.precache(['/*', 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/*']);

toolbox.router.get('/*', toolbox.networkFirst);
toolbox.router.get('https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/*', toolbox.fastest);
