import { IO, Maybe } from 'ramda-fantasy'

import {
    compose,
    curry,
    map,
} from 'ramda'

//    getLocalStorageIO :: key -> IO String
const getLocalStorageIO = key =>
    IO(() => window.localStorage.getItem(key))

//    setLocalStorageIO :: key -> value -> IO String
const setLocalStorageIO = curry((key, value) =>
    IO(() => {
        window.localStorage.setItem(key, value)
        return value
    }))

const safeGetLocalStorageIO = compose(map(Maybe), getLocalStorageIO)

export {
    getLocalStorageIO,
    setLocalStorageIO,
    safeGetLocalStorageIO,
}
