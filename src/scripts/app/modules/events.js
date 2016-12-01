import {
    compose,
    prop,
} from 'ramda';

const getTargetValueFromEvent = compose(
    prop('value'),
    prop('target'),
);

export {
    getTargetValueFromEvent,
};
