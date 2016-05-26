export function updateActivePreset(activePreset) {
  return {
    type: 'UPDATE_ACTIVE_PRESET',
    payload: { activePreset },
  };
}
