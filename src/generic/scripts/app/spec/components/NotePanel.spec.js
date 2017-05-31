import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import NotePanel from 'components/NotePanel'

const defaultAllowedLength = {
    id: '0.25',
    name: 'whole',
    amount: 1,
    isTriplet: false,
    isDotted: false,
}
const noteName = 'half'

describe('<NotePanel />', () => {
    it('renders the correct percentage', () => {
        const onUpdate = sinon.spy()
        const length = defaultAllowedLength
        const totalAmount = 5
        const props = {
            length,
            onUpdate,
            totalAmount,
        }
        const percentage = mount(<NotePanel {...props} />)
            .find('.note-panel__amount')
            .text()

        expect(percentage)
            .to.equal('20%')
    })
    it('fires onUpdate with updated length when up button is clicked', () => {
        const onUpdate = sinon.spy()
        const length = defaultAllowedLength
        const totalAmount = 5
        const props = {
            length,
            onUpdate,
            totalAmount,
        }
        const wrapper = mount(<NotePanel {...props} />)
            .find('.note-panel__btn--up')
            .simulate('click')
        const returnedAllowedLength = onUpdate.args[0][0]

        expect(returnedAllowedLength.amount)
            .to.equal(2)
    })
    describe('when down button is clicked', () => {
        it('fires onUpdate with updated length ', () => {
            const onUpdate = sinon.spy()
            const length = defaultAllowedLength
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)
                .find('.note-panel__btn--down')
                .simulate('click')
            const returnedAllowedLength = onUpdate.args[0][0]

            expect(returnedAllowedLength.amount)
                .to.equal(0)
        })
        it('doesnt fire onUpdate when the note amount is at 0', () => {
            const onUpdate = sinon.spy()
            const length = Object.assign({}, defaultAllowedLength, { amount: 0 })
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)
                .find('.note-panel__btn--down')
                .simulate('click')

            expect(onUpdate.notCalled)
                .to.equal(true)
        })
    })
    describe('when triplet button is clicked', () => {
        it('enables the isTriplet flag when not already enabled', () => {
            const onUpdate = sinon.spy()
            const length = defaultAllowedLength
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)

            wrapper
                .find('.toggle-input--triplet')
                .simulate('click')

            const returnedAllowedLength = onUpdate.args[0][0]

            expect(returnedAllowedLength.isTriplet)
                .to.equal(true)
            expect(returnedAllowedLength.isDotted)
                .to.equal(false)
        })
        it('enables the isTriplet property and disables the isDotted property', () => {
            const onUpdate = sinon.spy()
            const length = Object.assign({}, defaultAllowedLength, { isDotted: true })
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)

            wrapper
                .find('.toggle-input--triplet')
                .simulate('click')

            const returnedAllowedLength = onUpdate.args[0][0]

            expect(returnedAllowedLength.isTriplet)
                .to.equal(true)
            expect(returnedAllowedLength.isDotted)
                .to.equal(false)
        })
        it('disables the isTriplet flag when already enabled', () => {
            const onUpdate = sinon.spy()
            const length = Object.assign({}, defaultAllowedLength, { isTriplet: true })
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)

            wrapper
                .find('.toggle-input--triplet')
                .simulate('click')

            const returnedAllowedLength = onUpdate.args[0][0]

            expect(returnedAllowedLength.isTriplet)
                .to.equal(false)
            expect(returnedAllowedLength.isDotted)
                .to.equal(false)
        })
    })
    describe('when dotted button is clicked', () => {
        it('enables the isDotted flag when not already enabled', () => {
            const onUpdate = sinon.spy()
            const length = defaultAllowedLength
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)

            wrapper
                .find('.toggle-input--dotted')
                .simulate('click')

            const returnedAllowedLength = onUpdate.args[0][0]

            expect(returnedAllowedLength.isDotted)
                .to.equal(true)
            expect(returnedAllowedLength.isTriplet)
                .to.equal(false)
        })
        it('enables the isDotted property and disables the isTriplet property', () => {
            const onUpdate = sinon.spy()
            const length = Object.assign({}, defaultAllowedLength, { isTriplet: true })
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)

            wrapper
                .find('.toggle-input--dotted')
                .simulate('click')

            const returnedAllowedLength = onUpdate.args[0][0]

            expect(returnedAllowedLength.isDotted)
                .to.equal(true)
            expect(returnedAllowedLength.isTriplet)
                .to.equal(false)
        })
        it('disables the isDotted flag when already enabled', () => {
            const onUpdate = sinon.spy()
            const length = Object.assign({}, defaultAllowedLength, { isDotted: true })
            const totalAmount = 5
            const props = {
                length,
                onUpdate,
                totalAmount,
            }
            const wrapper = mount(<NotePanel {...props} />)

            wrapper
                .find('.toggle-input--dotted')
                .simulate('click')

            const returnedAllowedLength = onUpdate.args[0][0]

            expect(returnedAllowedLength.isDotted)
                .to.equal(false)
            expect(returnedAllowedLength.isTriplet)
                .to.equal(false)
        })
    })
})
