import React from 'react'
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
        const onUpdate = jest.fn()
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

        expect(percentage).toBe('20%')
    })
    it('fires onUpdate with updated length when up button is clicked', () => {
        const onUpdate = jest.fn()
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
        const returnedAllowedLength = onUpdate.mock.calls[0][0]

        expect(returnedAllowedLength.amount).toBe(2)
    })
    describe('when down button is clicked', () => {
        it('fires onUpdate with updated length ', () => {
            const onUpdate = jest.fn()
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
            const returnedAllowedLength = onUpdate.mock.calls[0][0]

            expect(returnedAllowedLength.amount).toBe(0)
        })
        it('doesnt fire onUpdate when the note amount is at 0', () => {
            const onUpdate = jest.fn()
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

            expect(onUpdate).not.toHaveBeenCalled()
        })
    })
    describe('when triplet button is clicked', () => {
        it('enables the isTriplet flag when not already enabled', () => {
            const onUpdate = jest.fn()
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

            const returnedAllowedLength = onUpdate.mock.calls[0][0]

            expect(returnedAllowedLength.isTriplet).toBe(true)
            expect(returnedAllowedLength.isDotted).toBe(false)
        })
        it('enables the isTriplet property and disables the isDotted property', () => {
            const onUpdate = jest.fn()
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

            const returnedAllowedLength = onUpdate.mock.calls[0][0]

            expect(returnedAllowedLength.isTriplet).toBe(true)
            expect(returnedAllowedLength.isDotted).toBe(false)
        })
        it('disables the isTriplet flag when already enabled', () => {
            const onUpdate = jest.fn()
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

            const returnedAllowedLength = onUpdate.mock.calls[0][0]

            expect(returnedAllowedLength.isTriplet).toBe(false)
            expect(returnedAllowedLength.isDotted).toBe(false)
        })
    })
    describe('when dotted button is clicked', () => {
        it('enables the isDotted flag when not already enabled', () => {
            const onUpdate = jest.fn()
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

            const returnedAllowedLength = onUpdate.mock.calls[0][0]

            expect(returnedAllowedLength.isDotted).toBe(true)
            expect(returnedAllowedLength.isTriplet).toBe(false)
        })
        it('enables the isDotted property and disables the isTriplet property', () => {
            const onUpdate = jest.fn()
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

            const returnedAllowedLength = onUpdate.mock.calls[0][0]

            expect(returnedAllowedLength.isDotted).toBe(true)
            expect(returnedAllowedLength.isTriplet).toBe(false)
        })
        it('disables the isDotted flag when already enabled', () => {
            const onUpdate = jest.fn()
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

            const returnedAllowedLength = onUpdate.mock.calls[0][0]

            expect(returnedAllowedLength.isDotted).toBe(false)
            expect(returnedAllowedLength.isTriplet).toBe(false)
        })
    })
})
