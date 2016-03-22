const repeat = (simsNeeded, fn) => {
	for (var i = simsNeeded - 1, x = 0; i >= 0; i--) {
		fn(simsNeeded, x);
		x++;
	};
}

const compose = (...args) => (x) => args.reduce((prev, cur) => cur.call(cur, prev), x);

const randFromTo = (from,to) => Math.floor(Math.random()*(to-from+1)+from);

export {
	repeat,
	compose,
	randFromTo
}
