import React from 'react'
import { mount } from 'enzyme'
import InputBox from 'components/InputBox'

describe('<InputBox />', () => {
  it('fires onChange with an event holding the new value', (done) => {
    const value = 5
    const newVal = 10
    const onChange = jest.fn()
    const props = {
      defaultValue: value,
      onChange: (...args) => {
        onChange(...args)
        assertions()
      },
    }
    const wrapper = mount(<InputBox {...props} />)
    const input = wrapper
      .find('input')
      .simulate('change', { target: { value: newVal } })

    function assertions() {
      const returnedArgument = onChange.mock.calls[0][0]
      expect(input.instance().value).toBe(value.toString())
      expect(returnedArgument.target.value).toBe(newVal)
      done()
    }
  })

  it("doesn't update value via new props when the input has been focused", () => {
    const value = 5
    const newVal = 10
    const props = {
      defaultValue: value,
    }
    const wrapper = mount(<InputBox {...props} />)
    const input = wrapper.find('input').simulate('focus')

    wrapper.setProps({ defaultValue: newVal })

    expect(input.instance().value).toBe(value.toString())
  })

  it("updates value via new props when the input isn't focused", () => {
    const value = 5
    const newVal = 10
    const props = {
      defaultValue: value,
    }
    const wrapper = mount(<InputBox {...props} />)
    const input = wrapper.find('input')

    wrapper.setProps({ defaultValue: newVal })

    expect(input.instance().value).toBe(newVal.toString())
  })

  it('adds a className to the input', () => {
    const value = 5
    const className = 'test-class'
    const props = {
      className,
      defaultValue: value,
    }
    const wrapper = mount(<InputBox {...props} />)
    const input = wrapper.find('input')

    expect(input.hasClass(className)).toBe(true)
  })

  it('adds an "is-valid" className to the input', () => {
    const props = {
      defaultValue: 5,
      maxVal: 10,
      minVal: 1,
    }
    const wrapper = mount(<InputBox {...props} />)
    expect(wrapper.find('input').hasClass('is-valid')).toBe(true)
  })

  it('adds an "is-invalid" className to the input if it goes above maxVal', () => {
    const props = {
      defaultValue: 15,
      maxVal: 10,
      minVal: 1,
    }
    const wrapper = mount(<InputBox {...props} />)
    expect(wrapper.find('input').hasClass('is-invalid')).toBe(true)
  })

  it('adds an "is-invalid" className to the input if it goes below minVal', () => {
    const props = {
      defaultValue: -1,
      maxVal: 10,
      minVal: 1,
    }
    const wrapper = mount(<InputBox {...props} />)
    expect(wrapper.find('input').hasClass('is-invalid')).toBe(true)
  })

  it('adds a label element when label is passed as a prop', () => {
    const value = 5
    const label = 'label text'
    const labelClassName = 'label-classname'
    const props = {
      defaultValue: value,
      label,
      labelClassName,
    }
    const wrapper = mount(<InputBox {...props} />)
    const labelElement = wrapper.find('label')

    expect(labelElement.exists()).toBe(true)

    expect(labelElement.text()).toBe(`${label}:`)

    expect(labelElement.hasClass(labelClassName)).toBe(true)
  })
})
