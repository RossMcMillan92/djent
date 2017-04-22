import {
    getActiveSoundsFromHitTypes,
} from '../../utils/instruments';

import { expect, assert } from 'chai';


describe('Instruments', () => {
    describe('getActiveSoundsFromHitTypes()', () => {

        it('should return an array', () => {
            expect(getActiveSoundsFromHitTypes([
                'crash-left',
                'crash-right',
                'crash-right',
                'crash-left',
            ])).to.be.a('array');
        })

        it('should return array of unique objects with IDs and "enabled" properties', () => {
            const results = getActiveSoundsFromHitTypes([
                'crash-left',
                'crash-right',
                'crash-right',
                'crash-left',
            ])

            expect(results.find(result => result.id === 'crash-left'))
                .to.have.property('enabled')
                .and.to.equal(true)
            expect(results.find(result => result.id === 'crash-right'))
                .to.have.property('enabled')
                .and.to.equal(true)
            expect(results.length).to.equal(2);
        })
    })
})
