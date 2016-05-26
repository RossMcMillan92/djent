import deepExtend from 'deep-extend';

import preset1 from './presets/preset1';

const presets = [
    preset1
];

export default presets;

const applyPreset = (initialState, presetID) => {
    const preset = presets[presetID];

    return deepExtend({}, initialState, preset);
}

export {
    applyPreset
}
