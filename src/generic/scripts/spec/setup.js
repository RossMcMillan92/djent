import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

global.IS_PHONEGAP = false
global.requestAnimationFrame = cb => setTimeout(cb, 0)
