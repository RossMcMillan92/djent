import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
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
        expect(wrapper.find('input')).to.have.value('90')
    })

    it('fires actions.updateBPM with new bpm when onChange is fired', (done) => {
        const newBPM = 95
        const updateBPM = sinon.spy()
        const assertions = () => {
            expect(updateBPM.calledWith(newBPM))
                .to.equal(true)
            done()
        }
        const props = {
            bpm: 90,
            actions: {
                updateBPM: (...args) => updateBPM(...args) || assertions()
            }
        }
        const wrapper = mount(<BPMController {...props} />)
            .find('input')
            .simulate('change', {target: {value: 95}})
    })
})
