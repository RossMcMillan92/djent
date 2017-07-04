import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { groupPresets, PresetController } from 'containers/PresetController'

PresetController.prototype.loadAndApplyPreset = sinon.spy()

const load = id => ({
    fork: (rej, res) => res({ default: id })
})

const presets = [
    {
        id: 'adtr',
        description: 'ADTR Breakdown',
        group: 'Pop Punk',
        load: load('adtr'),
    },
    {
        id: 'black-dahlia',
        description: 'Blast Beats',
        group: 'Heavy',
        load: load('black-dahlia'),
    },
    {
        id: 'contortionist',
        description: 'Poly Chords & Melody',
        group: 'Progressive',
        load: load('contortionist'),
    },
    {
        id: 'polyrhythms',
        description: 'Polyrhythms',
        group: 'Progressive',
        load: load('polyrhythms'),
    },
    {
        id: 'sworn-in',
        description: 'Sworn In',
        group: 'Artist',
        load: load('sworn-in'),
    },
    {
        id: 'meshuggah',
        description: 'Meshuggah',
        group: 'Djent',
        load: load('meshuggah'),
    },
    {
        id: 'thall',
        description: 'Thall I',
        group: 'Djent',
        load: load('thall'),
    },
    {
        id: 'thall-buster',
        description: 'Thall II',
        group: 'Djent',
        load: load('thall-buster'),
    },
    {
        id: 'thall-triplets',
        description: 'Thall III',
        group: 'Djent',
        load: load('thall-triplets'),
    },
]

describe('<PresetController />', () => {
    it('fires applyPreset with selected preset when changed', () => {
        const activePresetID = 'thall'
        const enableModal = sinon.spy()
        const applyPreset = sinon.spy()
        const disableModal = sinon.spy()
        const props = {
            actions: { applyPreset, disableModal, enableModal },
            activePresetID,
            presets,
        }
        const wrapper = mount(<PresetController {...props} />)
        wrapper
            .find('[value="thall"]')
            .simulate('click', { target: { value: activePresetID } })
        const returnedAllowedLength = applyPreset.args[0][0]

        expect(returnedAllowedLength)
            .to.equal(activePresetID)
    })
    it('renders groups of presets in <div> tags', () => {
        const activePresetID = 'thall'
        const onUpdate = sinon.spy()
        const props = {
            activePresetID,
            onUpdate,
            presets,
        }
        const wrapper = mount(<PresetController {...props} />)
        const groupDjent = wrapper
            .find('div[data-group="Djent"]')
        const groupProgressive = wrapper
            .find('div[data-group="Progressive"]')

        expect(groupDjent.exists())
            .to.equal(true)
        expect(groupProgressive.exists())
            .to.equal(true)
    })
    it('renders the correct presets inside the <div> tags', () => {
        const activePresetID = 'thall'
        const onUpdate = sinon.spy()
        const props = {
            activePresetID,
            onUpdate,
            presets,
        }
        const wrapper = mount(<PresetController {...props} />)
        const groupDjent = wrapper
            .find('div[data-group="Djent"]')
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
