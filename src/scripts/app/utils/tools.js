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

	return Array.from(Array(diff).keys())
		.reduce((newArr, index) => newArr.concat(...arr), [])
		.slice(0, length);
}

const extendObjectArrayByID = (one, two) => {
    return one.map((value, i, arr) => {
        const newValue = two.find(newValue => newValue.id === value.id);

		if (newValue) {
			return deepExtend({}, value, newValue);
		}

        return value;
    })
}

const compose = (...funcs) => {
  return (...args) => {
    if (funcs.length === 0) {
      return args[0]
    }

    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)

    return rest.reduceRight((composed, f) => f(composed), last(...args))
  }
}

const deepCloneObject = (obj) => Object.keys(obj)
    .reduce((newObject, objKey, i) => {
        const value = obj[objKey];
        const newValue = (typeof value === 'object' && !Array.isArray(value))
                    ? deepCloneObject(value)
                    : (Array.isArray(value))
                      ? value.map(deepCloneObject)
                      : value;

        return {
            ...newObject,
            [objKey]: newValue
        }
    }, {});

const randFromTo = (from,to) => Math.floor(Math.random()*(to-from+1)+from);

const randomFromArray = (arr) => arr[randFromTo(0, arr.length-1)];

const capitalize = (string) => string[0].toUpperCase() + string.substring(1);

const coinFlip = () => !!(Math.random() > 0.5)

export {
	arraySelector,
	capitalize,
	compose,
	coinFlip,
	deepCloneObject,
	extendObjectArrayByID,
	repeat,
	randFromTo,
	randomFromArray,
	repeatArray,
}
