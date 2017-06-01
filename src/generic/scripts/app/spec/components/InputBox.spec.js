import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import InputBox from 'components/InputBox'

describe('<InputBox />', () => {
    it('fires onChange with an event holding the new value', (done) => {
        const value = 5
        const newVal = 10
        const onChange = sinon.spy()
        const props = {
            defaultValue: value,
            onChange: (...args) => onChange(...args) || assertions(),
        }
        const wrapper = mount(<InputBox {...props} />)
        const input = wrapper.find('input')
            .simulate('change', {target: {value: newVal}})

        function assertions() {
            const returnedArgument = onChange.args[0][0]
            expect(input)
                .to.have.value(value.toString())
            expect(returnedArgument.target.value)
                .to.equal(newVal)
            done()
        }
    })

    it('doesn\'t update value via new props when the input has been focused', () => {
        const value = 5
        const newVal = 10
        const props = {
            defaultValue: value,
        }
        const wrapper = mount(<InputBox {...props} />)
        const input = wrapper.find('input')
            .simulate('focus')

        wrapper.setProps({ defaultValue: newVal })

        expect(input)
            .to.have.value(value.toString())
    })

    it('updates value via new props when the input isn\'t focused', () => {
        const value = 5
        const newVal = 10
        const props = {
            defaultValue: value,
        }
        const wrapper = mount(<InputBox {...props} />)
        const input = wrapper.find('input')

        wrapper.setProps({ defaultValue: newVal })

        expect(input)
            .to.have.value(newVal.toString())
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

        expect(input)
            .to.have.className(className)
    })

    it('adds a "is-valid"/"is-invalid" className to the input', () => {
        const value = 5
        const props = {
            defaultValue: value,
            maxVal: 10,
            minVal: 1,
        }
        const wrapper = mount(<InputBox {...props} />)
        const input = wrapper.find('input')

        expect(input)
            .to.have.className('is-valid')

        wrapper
            .setProps({ defaultValue: -1 })

        expect(input)
            .to.have.className('is-invalid')

        wrapper
            .setProps({ defaultValue: 15 })

        expect(input)
            .to.have.className('is-invalid')
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

        expect(labelElement.exists())
            .to.equal(true)

        expect(labelElement.text())
            .to.equal(`${label}:`)

        expect(labelElement)
            .to.have.className(labelClassName)
    })
})
