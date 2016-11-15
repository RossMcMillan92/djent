import { IO } from 'ramda-fantasy';

import {
    curry,
} from 'ramda';

//    getLocalStorageIO :: key -> IO String
const getLocalStorageIO = (key) =>
    IO(() => window.localStorage.getItem(key));

//    setLocalStorageIO :: key -> value -> IO String
const setLocalStorageIO = curry((key, value) =>
    IO(() => {
        window.localStorage.setItem(key, value);
        return value;
    }));

export {
    getLocalStorageIO,
    setLocalStorageIO,
}
