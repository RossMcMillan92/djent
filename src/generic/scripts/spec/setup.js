import 'raf/polyfill'
import 'core-js/es6/map'
import 'core-js/es6/set'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

global.IS_PHONEGAP = false
