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

        it('should return array of unique objects with IDs and "amount" properties', () => {
            const results = getActiveSoundsFromHitTypes([
                'crash-left',
                'crash-right',
                'crash-right',
                'crash-right',
                'crash-left',
                'china',
            ])

            expect(results.find(result => result.id === 'crash-left'))
                .to.have.property('amount')
                .and.to.equal(2)
            expect(results.find(result => result.id === 'crash-right'))
                .to.have.property('amount')
                .and.to.equal(3)
            expect(results.length).to.equal(3);
            expect(true).to.equal(false);
        })
    })
})
