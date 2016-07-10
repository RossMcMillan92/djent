import deepExtend from 'deep-extend';

const arraySelector = selector => Array.from(document.querySelectorAll(selector));

const repeat = (simsNeeded, fn) => {
	for (var i = simsNeeded - 1, x = 0; i >= 0; i--) {
		fn(simsNeeded, x);
		x++;
	};
}

const repeatArray = (arr, length) => {
	if (length === 0) return [];
	if (arr.length === length || arr.length === 0) return arr;
	if (arr.length > length) return arr.slice(0, length);

	const diff = Math.ceil(length / arr.length)

	return Array(diff)
		.fill()
		.reduce((newArr, index) => newArr.concat(...arr), [])
		.slice(0, length);
}

const extendObjectArrayByID = (one, two) =>
    one.map((value, i, arr) => {
        const newValue = two.find(newValue => newValue.id === value.id);

		if (newValue) {
			return deepExtend({}, value, newValue);
		}

        return value;
    })

const compose = (...funcs) =>
	(...args) => {
	    if (funcs.length === 0) {
		    return args[0]
	    }

	    const last = funcs[funcs.length - 1]
	    const rest = funcs.slice(0, -1)

	    return rest.reduceRight((composed, f) => f(composed), last(...args))
	}

const deepClone = (obj) =>
	Array.isArray(obj)
	? obj.map(deepClone)
	: Object.keys(obj)
	    .reduce((newObject, objKey, i) => {
	        const value = obj[objKey];
	        const newValue = (typeof value === 'object' && !Array.isArray(value))
	                    ? deepClone(value)
	                    : (Array.isArray(value))
	                      ? value.map(deepClone)
	                      : value;

	        return {
	            ...newObject,
	            [objKey]: newValue
	        }
	    }, {});

const updateObjByID = ({ objs, id, prop, value }) =>
    objs.map(beat => {
        const newObj = { ...beat };
        if (newObj.id === id) newObj[prop] = value;
        return newObj;
    });

const parseQueryString = (url = window.location.href) =>
	!url.includes('?') ? {} : url
	    .split('?')[1]
	    .split('&')
	    .reduce((list, query) => {
	        const [ key, value ] = query.split('=');
	        return { ...list, [key]: value || '' };
	    }, {});

const getHashQueryParam = (param, url = window.location.hash) => {
    const paramPart1 = url.split(`${param}\=`)[1];
    if (!paramPart1) return '';

    return paramPart1.split('&')[0]
}

const loadScript = (path) => {
	const script = document.createElement('script');
	script.src = path;
	document.body.appendChild(script);
}

const roundToXPlaces = (value, decimalPlaces, type = 'round') => Math[type](value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

const confineToRange = (value, min, max) => Math.min(max, Math.max(min, value));

const randFromTo = (from,to) => Math.floor(Math.random()*(to-from+1)+from);

const randomFromArray = (arr) => arr[randFromTo(0, arr.length-1)];

const capitalize = (string) => string[0].toUpperCase() + string.substring(1);

const coinFlip = () => !!(Math.random() > 0.5);

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export {
	arraySelector,
	capitalize,
	coinFlip,
	compose,
	confineToRange,
	deepClone,
	extendObjectArrayByID,
	getHashQueryParam,
	isIOS,
	loadScript,
	parseQueryString,
	repeat,
	randFromTo,
	randomFromArray,
	repeatArray,
	roundToXPlaces,
	updateObjByID,
}
