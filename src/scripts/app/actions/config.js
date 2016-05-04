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

export function updateHitChance(hitChance) {
  return {
    type: 'UPDATE_HITCHANCE',
    payload: { hitChance },
  };
}
