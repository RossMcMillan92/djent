import presets from '../utils/presets';

export function updateAllowedLengths(allowedLengths) {
  return {
    type: 'UPDATE_ALLOWED_LENGTHS',
    payload: { allowedLengths },
  };
}

export function updateBPM(bpm) {
  return {
    type: 'UPDATE_BPM',
    payload: { bpm },
  };
}

export function updateIsLooping(isLooping) {
  return {
    type: 'UPDATE_IS_LOOPING',
    payload: { isLooping },
  };
}

export function updateContinuousGeneration(continuousGeneration) {
  return {
    type: 'UPDATE_CONTINUOUS_GENERATION',
    payload: { continuousGeneration },
  };
}

export function updateHitChance(hitChance) {
  return {
    type: 'UPDATE_HITCHANCE',
    payload: { hitChance },
  };
}

export function updateFadeIn(fadeIn) {
  return {
    type: 'UPDATE_FADEIN',
    payload: { fadeIn },
  };
}

export function updateFateOut(fadeOut) {
  return {
    type: 'UPDATE_FADEOUT',
    payload: { fadeOut },
  };
}

export function applyPreset(presetID) {
    const preset = { ...presets.find(preset => preset.id === presetID) };
    return {
        type: 'APPLY_PRESET',
        payload: { preset },
    };
}
