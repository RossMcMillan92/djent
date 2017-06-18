import { assoc, map } from 'ramda'
import { Maybe, Future as Task } from 'ramda-fantasy'
import { safeGetLocalStorageIO } from 'modules/localStorageIO'
import promiseToTask from 'modules/promiseToTask'

const initialPresets = [
    {
        id: 'meshuggah',
        description: 'Meshuggah',
        group: 'Artists',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.meshuggah" */ 'utils/presets/meshuggah')
        )
    },
    {
        id: 'sworn-in',
        description: 'Sworn In',
        group: 'Artists',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.sworn-in" */ 'utils/presets/sworn-in')
        )
    },
    {
        id: 'thall-buster',
        description: 'Scratchy heavy',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall-buster" */ 'utils/presets/thall-buster')
        )
    },
    {
        id: 'thall-chicken',
        description: 'Scratchy groovy',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall-chicken" */ 'utils/presets/thall-chicken')
        )
    },
    {
        id: 'thall',
        description: 'Thall',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall" */ 'utils/presets/thall')
        )
    },
    {
        id: 'thall-triplets',
        description: 'Thall (triplets)',
        group: 'Djent',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.thall-triplets" */ 'utils/presets/thall-triplets')
        )
    },
    {
        id: 'black-dahlia',
        description: 'Blast Beats',
        group: 'Heavy',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.black-dahlia" */ 'utils/presets/black-dahlia')
        )
    },
    {
        id: 'adtr',
        description: 'Breakdown',
        group: 'Pop Punk',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.adtr-breakdown" */ 'utils/presets/adtr-breakdown')
        )
    },
    {
        id: 'contortionist',
        description: 'Poly Chords & Melody',
        group: 'Progressive',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.contortionist" */ 'utils/presets/contortionist')
        )
    },
    {
        id: 'polyrhythms',
        description: 'Polyrhythms',
        group: 'Progressive',
        load: promiseToTask(() =>
            import(/* webpackChunkName: "presets.polyrhythms" */ 'utils/presets/polyrhythms')
        )
    },
]

const initialState = safeGetLocalStorageIO('presets')
    .map(Maybe.maybe([], JSON.parse))
    .map(map(assoc('group', 'Custom')))
    .map(map(preset => assoc('load', Task.of({ default: preset }), preset)))
    .map(ps => initialPresets.concat(ps))
    .runIO()

export default initialState
