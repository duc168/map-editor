import sliceReducer, {
  MenuState,
  updateCurrentOptionAction
} from './menuSlice';

describe('menu reducer', () => {
  const initialState: MenuState = {        
  };
  it('should handle initial state', () => {
    expect(sliceReducer(undefined, { type: 'unknown' })).toEqual({
      currentOption: undefined      
    });
  });

  it('should handle update Current Option', () => {
    const actual = sliceReducer(initialState, updateCurrentOptionAction({
      name: 'lion',
      type: 'image',
      src: 'https://duc168.com/test.png'
    }));
    expect(actual.currentOption).toEqual({
      name: 'lion',
      type: 'image',
      src: 'https://duc168.com/test.png'
    });
  });
});
