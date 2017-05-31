import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import AllowedLengthsController from 'components/AllowedLengthsController'

const defaultAllowedLengths = [
    {
        id: '0.25',
        name: 'whole',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '0.5',
        name: 'half',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '1',
        name: 'quarter',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '2',
        name: 'eighth',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
    {
        id: '4',
        name: 'sixteenth',
        amount: 0,
        isTriplet: false,
        isDotted: false,
    },
]

describe('<AllowedLengthsController />', () => {
    it('fires onUpdate with updated allowedLengths when up button is clicked', () => {
        const noteName = 'half'
        const onUpdate = sinon.spy()
        const allowedLengths = defaultAllowedLengths
        const props = {
            allowedLengths,
            onUpdate
        }
        const wrapper = mount(<AllowedLengthsController {...props} />)
            .find(`.note-panel__btn--${noteName}.note-panel__btn--up`)
            .simulate('click')
        const returnedAllowedLengths = onUpdate.args[0][0]
        const alteredLength = returnedAllowedLengths.find(l => l.name === noteName)

        expect(alteredLength.amount)
            .to.equal(1)
    })
    describe('when down button is clicked', () => {
        it('fires onUpdate with updated allowedLengths ', () => {
            const noteName = 'whole'
            const onUpdate = sinon.spy()
            const allowedLengths = defaultAllowedLengths
                .map(l => Object.assign({}, l, { amount: 1 }))
            const props = {
                allowedLengths,
                onUpdate
            }
            const wrapper = mount(<AllowedLengthsController {...props} />)
                .find(`.note-panel__btn--${noteName}.note-panel__btn--down`)
                .simulate('click')
            const returnedAllowedLengths = onUpdate.args[0][0]
            const alteredLength = returnedAllowedLengths.find(l => l.name === noteName)

            expect(alteredLength.amount)
                .to.equal(0)
        })
        it('doesnt fire onUpdate when the note amount is at 0', () => {
            const noteName = 'whole'
            const onUpdate = sinon.spy()
            const allowedLengths = defaultAllowedLengths
            const props = {
                allowedLengths,
                onUpdate
            }
            const wrapper = mount(<AllowedLengthsController {...props} />)
                .find(`.note-panel__btn--${noteName}.note-panel__btn--down`)
                .simulate('click')

            expect(onUpdate.notCalled)
                .to.equal(true)
        })
    })
})
