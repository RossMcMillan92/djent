/* global NODE_ENV */
/* eslint no-console: 0 */

import deepExtend from 'deep-extend'
import { curry } from 'ramda'

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

export const filterOutKeys = (blockedKeys, origObj) =>
	Object.keys(origObj)
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

export const roundToXPlaces = curry((decimalPlaces, value) =>
	Math.round(value * (10 ** decimalPlaces)) / (10 ** decimalPlaces))

export const confineToRange = (min, max, value) => Math.min(max, Math.max(min, value))

export const randFromTo = (from, to) => Math.floor(Math.random() * (((to - from) + 1) + from))

export const randomFromArray = arr => arr[randFromTo(0, arr.length - 1)]

export const capitalize = string => string[0].toUpperCase() + string.substring(1)

export const isDevEnv = () => NODE_ENV === 'development'

export const log = (...args) => {
	if (isDevEnv()) console.log(...args)
}

export const logError = (...args) => {
	if (isDevEnv()) (console.error || console.log).apply(console, args)
}

export const trace = curry((tag, d) => {
	console.log(tag, d)
	return d
})

window.trace = trace
