import React from 'react'
import { mount } from 'enzyme'
import BeatsController from 'components/BeatsController'

const sequence = {
    id    : 'total',
    bars  : 8,
    beats : 4,
}

describe('<BeatsController />', () => {
    it('displays the relevant bars and beats given in a sequence', () => {
        const onUpdate = jest.fn()
        const props = {
            onUpdate,
            sequence
        }
        const wrapper = mount(<BeatsController {...props} />)
        const inputBars = wrapper.find(`#${sequence.id}-bars`)
        const inputBeats = wrapper.find(`#${sequence.id}-beats`)

        expect(inputBars.node.value)
            .toBe(sequence.bars.toString())
        expect(inputBeats.node.value)
            .toBe(sequence.beats.toString())
    })

    it('calls onUpdate when bars have changed', (done) => {
        const newVal = 10
        const onUpdate = jest.fn()
        const props = {
            onUpdate: (...args) => onUpdate(...args) || assertions(),
            sequence
        }
        const wrapper = mount(<BeatsController {...props} />)
        const inputBars = wrapper.find(`#${sequence.id}-bars`)
            .simulate('change', { target: { value: newVal } })

        function assertions() {
            expect(onUpdate).toHaveBeenCalledWith(sequence.id, 'bars', newVal)
            done()
        }
    })

    it('calls onUpdate when beats have changed', (done) => {
        const newVal = 1
        const onUpdate = jest.fn()
        const props = {
            onUpdate: (...args) => onUpdate(...args) || assertions(),
            sequence
        }
        const wrapper = mount(<BeatsController {...props} />)
        const inputBars = wrapper.find(`#${sequence.id}-beats`)
            .simulate('change', {target: {value: newVal}})

        function assertions() {
            expect(onUpdate).toHaveBeenCalledWith(sequence.id, 'beats', newVal)
            done()
        }
    })
})
