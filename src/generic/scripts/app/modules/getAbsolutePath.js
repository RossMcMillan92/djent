const isOffline = !!window.location.href.includes('index.html')
const getAbsolutePath = () =>
    isOffline
        ? window.location.href.split('index.html')[0]
        : '/'

export default getAbsolutePath
