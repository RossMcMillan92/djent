import React from 'react'
import { mount } from 'enzyme'
import BeatsController from 'components/BeatsController'

const sequence = {
  id: 'total',
  bars: 8,
  beats: 4,
}

describe('<BeatsController />', () => {
  it('displays the relevant bars and beats given in a sequence', () => {
    const onUpdate = jest.fn()
    const props = {
      onUpdate,
      sequence,
    }
    const wrapper = mount(<BeatsController {...props} />)
    const inputBars = wrapper.find(`#${sequence.id}-bars`).first()
    const inputBeats = wrapper.find(`#${sequence.id}-beats`).first()

    expect(inputBars.instance().props.defaultValue).toBe(sequence.bars)
    expect(inputBeats.instance().props.defaultValue).toBe(sequence.beats)
  })

  it('calls onUpdate when bars have changed', (done) => {
    const newVal = 10
    const onUpdateMock = jest.fn()
    const props = {
      onUpdate: (...args) => {
        onUpdateMock(...args)
        assertions()
      },
      sequence,
    }
    const wrapper = mount(<BeatsController {...props} />)
    const inputBars = wrapper
      .find(`#${sequence.id}-bars`)
      .first()
      .props()
      .onChange({ target: { value: newVal } })

    function assertions() {
      expect(onUpdateMock).toHaveBeenCalledWith(sequence.id, 'bars', newVal)
      done()
    }
  })

  it('calls onUpdate when beats have changed', (done) => {
    const newVal = 1
    const onUpdateMock = jest.fn()
    const props = {
      onUpdate: (...args) => {
        onUpdateMock(...args)
        assertions()
      },
      sequence,
    }
    const wrapper = mount(<BeatsController {...props} />)
    const inputBars = wrapper
      .find(`#${sequence.id}-beats`)
      .first()
      .props()
      .onChange({ target: { value: newVal } })

    function assertions() {
      expect(onUpdateMock).toHaveBeenCalledWith(sequence.id, 'beats', newVal)
      done()
    }
  })
})
