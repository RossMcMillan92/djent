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

export function updateBeats(id, prop, value) {
  return {
    type: 'UPDATE_BEATS',
    payload: { id, prop, value },
  };
}
