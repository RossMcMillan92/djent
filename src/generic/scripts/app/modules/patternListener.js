import { curry } from 'ramda'
import { Future as Task } from 'ramda-fantasy'

//    arraysAreDifferent :: [a] -> [a] -> Boolean
const arraysAreDifferent = curry((arr1, arr2) =>
    (arr1.length !== arr2.length) || !!arr1.find((item, i) => item !== arr2[i]))

//    patternListener :: [keyCode] => Task () ()
const patternListener = pattern =>
    Task((rej, res) => {
        const keyListener = curry((pat, e) => {
            keyPresses = keyPresses.concat(e.keyCode)
            if (keyPresses.length > pat.length) keyPresses.shift()
            if (!patternIsDifferent(keyPresses)) {
                document.body.removeEventListener('keydown', listener)
                res()
            }
        })

        let keyPresses = []
        const patternIsDifferent = arraysAreDifferent(pattern)
        const listener = keyListener(pattern)
        document.body.addEventListener('keydown', listener)
    })

export default patternListener
