/* global NODE_ENV */
/* eslint no-console: 0 */

import deepExtend from 'deep-extend'
import { curry } from 'ramda'

export const arraySelector = selector => Array.from(document.querySelectorAll(selector))

export const repeatArray = (arr, length) => {
	if (length === 0) return []
	if (arr.length === length || arr.length === 0) return arr
	if (arr.length > length) return arr.slice(0, length)

	const diff = Math.ceil(length / arr.length)

	return Array(diff)
		.fill()
		.reduce(newArr => newArr.concat(...arr), [])
		.slice(0, length)
}

export const extendObjectArrayByID = (one, two) =>
	one.map((value) => {
		const newValue = two.find(v => v.id === value.id)

		if (newValue) {
			return deepExtend({}, value, newValue)
		}

		return value
	})

export const deepClone = obj =>
	Array.isArray(obj)
	? obj.map(deepClone)
	: Object.keys(obj)
	.reduce((newObject, objKey) => {
		const value = obj[objKey]
		const newValue = deepCloneInner(value)

		return {
			...newObject,
			[objKey]: newValue
		}
	}, {})

export const deepCloneInner = value => (typeof value === 'object' && !Array.isArray(value))
	? deepClone(value)
	: (Array.isArray(value))
	? value.map(deepCloneInner)
	: value

export const updateObjByID = ({ objs, id, prop, value }) =>
	objs.map((beat) => {
		const newObj = { ...beat }
		if (newObj.id === id) newObj[prop] = value
		return newObj
	})

export const parseQueryString = (url = window.location.href) =>
	!url.includes('?') ? {} : url
	.split('?')[1]
	.split('&')
	.reduce((list, query) => {
		const [ key, value ] = query.split('=')
		return { ...list, [key]: value || '' }
	}, {})

export const getHashQueryParam = curry((param, url) => {
	const paramPart1 = url.split(`${param}=`)[1]
	if (!paramPart1) return ''

	return paramPart1.split('&')[0]
})

export const loadScript = (path) => {
	const script = document.createElement('script')
	script.src = path
	document.body.appendChild(script)
}

export const filterOutKeys = (blockedKeys, origObj) => Object.keys(origObj)
    .reduce((newObj, key) => {
        if (blockedKeys.includes(key)) return newObj
        return {
            ...newObj,
            [key]: origObj[key]
        }
    }, {})

export const throttle = (fn, delay, context = this) => {
    let timeout
    return (...args) => {
        timeout = timeout || setTimeout(() => {
            fn.apply(context, args)
            timeout = undefined
        }, delay)
    }
}

export const roundToXPlaces = (value, decimalPlaces, type = 'round') =>
	Math[type](value * (10 ** decimalPlaces)) / (10 ** decimalPlaces)

export const confineToRange = (min, max, value) => Math.min(max, Math.max(min, value))

export const randFromTo = (from, to) => Math.floor(Math.random() * (((to - from) + 1) + from))

export const randomFromArray = arr => arr[randFromTo(0, arr.length - 1)]

export const capitalize = string => string[0].toUpperCase() + string.substring(1)

export const coinFlip = () => !!(Math.random() > 0.5)

export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

export const isDevEnv = () => NODE_ENV === 'development'

export const log = (...args) => {
	if (isDevEnv()) console.log(...args)
	return args[0]
}

export const logError = (...args) => {
	if (isDevEnv()) (console.error || console.log).apply(console, args)
	return args[0]
}

export const trace = curry((tag, d) => {
	log(tag, d)
	return d
})

if (isDevEnv()) window.trace = trace

// catchError :: Promise p => (err -> b) -> p -> p
export const catchError = curry((rej, p) => p.catch(rej))

// fork :: Future fu => (err -> b) -> (a -> b) -> fu -> fu
export const fork = curry((rej, res, fu) => fu
	.fork(rej, res))
