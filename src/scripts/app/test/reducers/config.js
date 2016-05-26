import { expect, assert } from 'chai';
import config from '../../reducers/config';

const initialState = {
    activePreset: 'preset1',
}

describe('Config reducer:', () => {
    it('should return the initial state', () => {
        expect(config(initialState, {}))
            .to.deep.equal(initialState);
    });

    it('should handle UPDATE_ACTIVE_PRESET', () => {
        const stateAfterAdd = {
            ...initialState,
            activePreset: 'newpreset',
        };
        const payload = {
            activePreset: 'newpreset'
        }

        expect(config(initialState, {
            type: 'UPDATE_ACTIVE_PRESET',
            payload,
        }))
            .to.deep.equal(stateAfterAdd);
    });

});
