import React from 'react'
import { mount } from 'enzyme'
import BPMInput from 'components/BPMInput'

describe('<BPMInput />', () => {
  it('renders the value passed as prop BPM', () => {
    const props = {
      bpm: 90,
      onChange: () => {},
    }
    const wrapper = mount(<BPMInput {...props} />)
    expect(wrapper.find('input').props().defaultValue).toBe(90)
  })

  it('fires onChange with new bpm when onChange is fired', (done) => {
    const onChangeMock = jest.fn()
    const props = {
      bpm: 90,
      onChange: (...args) => {
        onChangeMock(...args)
        assertions()
      },
    }
    const wrapper = mount(<BPMInput {...props} />)
      .find('input')
      .props()
      .onChange({ target: { value: 95 }, persist: () => {} })

    function assertions() {
      expect(onChangeMock).toHaveBeenCalledWith(95)
      done()
    }
  })
})
