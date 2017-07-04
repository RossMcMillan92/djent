import {
    getActiveSoundsFromHitTypes,
} from 'utils/instruments'


describe('Instruments', () => {
    describe('getActiveSoundsFromHitTypes()', () => {
        it('should return array of unique objects with IDs and "amount" properties', () => {
            const results = getActiveSoundsFromHitTypes([
                'crash-left',
                'crash-right',
                'crash-right',
                'crash-right',
                'crash-left',
                'china',
            ])

            expect(results.find(result => result.id === 'crash-left')).toHaveProperty('amount', 2)
            expect(results.find(result => result.id === 'crash-right')).toHaveProperty('amount', 3)
            expect(results.length).toBe(3)
        })
    })
})
