const arraySelector = selector => Array.from(document.querySelectorAll(selector));

const repeat = (simsNeeded, fn) => {
	for (var i = simsNeeded - 1, x = 0; i >= 0; i--) {
		fn(simsNeeded, x);
		x++;
	};
}

const repeatArray = (arr, length) => {
	if (length === 0) return [];
	if (arr.length === length) return arr;
	if (arr.length > length) return arr.slice(0, length);

	const diff = Math.ceil(length / arr.length)
	return Array.from(Array(diff).keys())
		.reduce((newArr, index) => newArr.concat(...arr), [])
		.slice(0, length);
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

const randFromTo = (from,to) => Math.floor(Math.random()*(to-from+1)+from);

const randomFromArray = (arr) => arr[randFromTo(0, arr.length-1)];

export {
	arraySelector,
	repeat,
	repeatArray,
	compose,
	randomFromArray,
	randFromTo
}
