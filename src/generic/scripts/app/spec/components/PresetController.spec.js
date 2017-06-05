import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import PresetController, { groupPresets } from 'components/PresetController'

const presets = [
    {
        id: 'adtr',
        description: 'ADTR Breakdown',
        group: 'Pop Punk',
    },
    {
        id: 'black-dahlia',
        description: 'Blast Beats',
        group: 'Heavy',
    },
    {
        id: 'contortionist',
        description: 'Poly Chords & Melody',
        group: 'Progressive',
    },
    {
        id: 'polyrhythms',
        description: 'Polyrhythms',
        group: 'Progressive',
    },
    {
        id: 'sworn-in',
        description: 'Sworn In',
    },
    {
        id: 'meshuggah',
        description: 'Meshuggah',
        group: 'Djent',
    },
    {
        id: 'thall',
        description: 'Thall I',
        group: 'Djent',
    },
    {
        id: 'thall-buster',
        description: 'Thall II',
        group: 'Djent',
    },
    {
        id: 'thall-triplets',
        description: 'Thall III',
        group: 'Djent',
    },
]

describe('<PresetController />', () => {
    it('fires onUpdate with selected preset when changed', () => {
        const activePresetID = 'thall'
        const onUpdate = sinon.spy()
        const props = {
            activePresetID,
            onUpdate,
            presets,
        }
        const wrapper = mount(<PresetController {...props} />)
            .find('select')
            .simulate('change', {target: {value: activePresetID}})
        const returnedAllowedLength = onUpdate.args[0][0]

        expect(presets.find(p => p.id === activePresetID))
            .to.deep.equal(returnedAllowedLength)
    })
    it('renders groups of presets in <optgroup> tags', () => {
        const activePresetID = 'thall'
        const onUpdate = sinon.spy()
        const props = {
            activePresetID,
            onUpdate,
            presets,
        }
        const wrapper = mount(<PresetController {...props} />)
        const groupDjent = wrapper
            .find('optgroup[label="Djent"]')
        const groupProgressive = wrapper
            .find('optgroup[label="Progressive"]')

        expect(groupDjent.exists())
            .to.equal(true)
        expect(groupProgressive.exists())
            .to.equal(true)
    })
    it('renders the correct presets inside the <optgroup> tags', () => {
        const activePresetID = 'thall'
        const onUpdate = sinon.spy()
        const props = {
            activePresetID,
            onUpdate,
            presets,
        }
        const wrapper = mount(<PresetController {...props} />)
        const groupDjent = wrapper
            .find('optgroup[label="Djent"]')
        const thallPreset = groupDjent
            .find('[value="thall"]')
        const meshuggahPreset = groupDjent
            .find('[value="meshuggah"]')

        expect(thallPreset.exists())
            .to.equal(true)
        expect(meshuggahPreset.exists())
            .to.equal(true)
    })
})

describe('groupPresets function', () => {
    it('groups the presets into an array of groups of presets', () => {
        const startingArray = [
            { group: 'Heavy' },
            { group: 'Progressive' },
            { group: 'Djent' },
            { group: 'Heavy' },
            { group: 'Djent' },
        ]
        const expectedResult = [
            [
                { group: 'Heavy' },
                { group: 'Heavy' },
            ],
            [
                { group: 'Progressive' },
            ],
            [
                { group: 'Djent' },
                { group: 'Djent' },
            ],
        ]

        expect(groupPresets(startingArray))
            .to.deep.equal(expectedResult)
    })
})
