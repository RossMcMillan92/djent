import { compose, curry } from 'ramda'

//    getPercentage :: Int -> Int -> Int
const getPercentage = curry((total, amount) => Math.floor((amount / total) * 100))

export default getPercentage
