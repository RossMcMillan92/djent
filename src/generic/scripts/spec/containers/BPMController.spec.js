import React from 'react'
import { mount } from 'enzyme'
import { BPMController } from 'containers/BPMController'

describe('<BPMController />', () => {
    it('renders the value passed as prop BPM', () => {
        const props = {
            bpm: 90,
            actions: {
                updateBPM: () => {}
            }
        }
        const wrapper = mount(<BPMController {...props} />)
        expect(wrapper.find('input').node.value).toBe('90')
    })

    it('fires actions.updateBPM with new bpm when onChange is fired', (done) => {
        const newBPM = 95
        const updateBPM = jest.fn()
        const props = {
            bpm: 90,
            actions: {
                updateBPM: (...args) => updateBPM(...args) || assertions()
            }
        }
        const wrapper = mount(<BPMController {...props} />)
            .find('input')
            .simulate('change', {target: {value: 95}})
        function assertions() {
            expect(updateBPM).toHaveBeenCalledWith(newBPM)
            done()
        }
    })
})
