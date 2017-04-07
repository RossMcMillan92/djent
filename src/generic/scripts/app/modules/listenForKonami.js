import patternListener from 'modules/patternListener'

const konamiCodeKeyPresses = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

export default () => patternListener(konamiCodeKeyPresses)
