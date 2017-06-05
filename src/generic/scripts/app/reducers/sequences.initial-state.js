import deepExtend from 'deep-extend'

import {
    deepClone,
    extendObjectArrayByID,
    updateObjByID
} from 'utils/tools'

const defaultAllowedLengths = [
    {
        id: '0.25',
        name: 'whole',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '0.5',
        name: 'half',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '1',
        name: 'quarter',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '2',
        name: 'eighth',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '4',
        name: 'sixteenth',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
]

const initialCustomSequence = {
    id          : 'CUSTOM_SEQUENCE_1',
    description : 'Custom Sequence',
    bars        : 4,
    beats       : 4,
    hitChance   : 1,
    allowedLengths: defaultAllowedLengths,
}

const initialState = [
    {
        id    : 'total',
        bars  : 8,
        beats : 4,
    },
    initialCustomSequence
]

export default initialState
export {
    defaultAllowedLengths,
    initialCustomSequence,
    initialState,
}
