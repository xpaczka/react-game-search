import { store, RootState } from '../store';

describe('Redux store', () => {
  it('should return initial state of store', () => {
    const mockInitialState: RootState = {
      search: {
        data: null,
        isLoading: false,
        error: null,
        queryString: null,
      },
    };

    expect(store.getState()).toEqual(mockInitialState);
  });
});
