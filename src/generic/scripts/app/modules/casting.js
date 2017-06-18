//    toBoolean :: a -> Bool
const toBoolean = a => a === 'false' ? false : !!a

const toString = a => `${a}`

export {
    toBoolean,
    toString,
}
