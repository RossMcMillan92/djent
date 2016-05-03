import expect from 'expect';
import { items } from 'reducers/items';

const initialState = {
  items: [],
};

describe('Items reducer:', () => {
  it('should return the initial state', () => {
    expect(
      items(initialState, {})
    ).toEqual(initialState);
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
    ).toEqual(stateAfterAdd);
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
    ).toEqual(initialState);
  });
});
