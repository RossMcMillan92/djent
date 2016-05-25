
import { expect, assert } from 'chai';
import { items } from '../../reducers/items';

const initialState = {
  items: [],
};

describe('Items reducer:', () => {
  it('should return the initial state', () => {
    expect(
      items(initialState, {})
  ).to.deep.equal(initialState);
  });

  it('should handle ADD', () => {
    const stateAfterAdd = {
      items: [{
        text: 'test'
      }],
    };
    const fields =  { name: { value: 'test'}};
    expect(
      items(initialState, {
        type: 'ADD_ITEM',
        fields: fields,
      })
  ).to.deep.equal(stateAfterAdd);
  });

  it('should handle DELETE', () => {
    const stateWithItem = {
      items: [{
        text: 'test'
      }],
    };
    expect(
      items(stateWithItem, {
        type: 'DELETE_ITEM',
        index: 0
      })
  ).to.deep.equal(initialState);
  });
});
