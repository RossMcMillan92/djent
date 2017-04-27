import { Future as Task } from 'ramda-fantasy'

//    promiseToTask :: Promise -> Task rej res
const promiseToTask = p => Task((rej, res) => p().then(res).catch(rej))

export default promiseToTask
