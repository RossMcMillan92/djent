import { curry } from 'ramda';

const Maybe = function(x) {
  this.__value = x;
};

Maybe.of = x => new Maybe(x)

Maybe.prototype.isNothing = function () { return (this.__value === null || this.__value === undefined) };

Maybe.prototype.map = function (f) { return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value)) };

const maybe = curry((x, f, m) => m.isNothing() ? x : f(m.__value));

const fmap = (fn, mappable) => mappable.map(fn)

export {
    fmap,
    Maybe,
    maybe
}
