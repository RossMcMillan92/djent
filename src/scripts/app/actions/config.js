export function updateAllowedLengths(allowedLengths) {
  return {
    type: 'UPDATE_ALLOWED_LENGTHS',
    payload: { allowedLengths },
  };
}

export function updateBPM(bpm) {
    if (!bpm)       bpm = 100;
    if (bpm < 50)   bpm = 50;
    if (bpm > 300) bpm = 300;

    return {
        type: 'UPDATE_BPM',
        payload: { bpm },
    };
}

export function updateContinuousGeneration(continuousGeneration) {
  return {
    type: 'UPDATE_CONTINUOUS_GENERATION',
    payload: { continuousGeneration },
  };
}

export function updateHitChance(hitChance) {
    if (!hitChance)       hitChance = 1;
    if (hitChance < 0.05) hitChance = 0.05;
    if (hitChance > 1)    hitChance = 1;

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

export function applyPreset(preset) {;
    return {
        type: 'APPLY_PRESET',
        payload: { preset },
    };
}
