import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import BPMTapper from 'components/BPMTapper'

describe('<BPMTapper />', () => {
    it('fires onUpdate with default bpm value of 100 when clicked once', () => {
        const defaultBPM = 100
        const onUpdate = sinon.spy()
        const props = {
            onUpdate
        }
        const wrapper = mount(<BPMTapper {...props} />)
            .find('button')
            .simulate('click')

        expect(onUpdate.calledWith(defaultBPM))
            .to.equal(true)
    })
})
