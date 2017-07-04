import 'jsdom-global/register'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { JSDOM } from 'jsdom'
import sinon from 'sinon'

chai.use(chaiEnzyme())

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

window.localStorage = {
    getItem: sinon.spy(),
    setItem: sinon.spy(),
}

global.IS_PHONEGAP = false
global.window = window
global.document = window.document
global.navigator = {
    userAgent: 'node.js'
}
copyProps(window, global)
