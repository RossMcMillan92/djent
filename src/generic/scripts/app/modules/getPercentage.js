import { compose, curry } from 'ramda'

//    getPercentage :: Int -> Int -> Int
const getPercentage = curry((total, amount) => total !== 0
    ? Math.floor((amount / total) * 1000) / 10
    : 0)

export default getPercentage
