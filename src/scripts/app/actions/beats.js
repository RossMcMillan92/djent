export function updateBeats(id, prop, value) {
  return {
    type: 'UPDATE_BEATS',
    payload: { id, prop, value },
  };
}
