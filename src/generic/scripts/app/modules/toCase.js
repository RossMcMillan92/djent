import { toString } from 'modules/casting'

//    toKebabCase :: String -> String
const toKebabCase = s => toString(s)
    .toLowerCase()
    .split(' ')
    .join('-')

export {
    toKebabCase
}
