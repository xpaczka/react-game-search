import searchReducer, {
  getResultsStart,
  getResultsSuccess,
  getResultsError,
  getCurrentQueryString,
  ISearchData,
  ISearchState,
} from '../store/searchSlice';

describe('Search slice', () => {
  let initialState: ISearchState;

  beforeEach(() => {
    initialState = { data: null, isLoading: false, error: null, queryString: null };
  });

  describe('Get Results Start reducer', () => {
    it('sets isLoading to true', () => {
      const state = searchReducer(initialState, getResultsStart());
      expect(state.isLoading).toBe(true);
    });
  });

  describe('Get Results Success reducer', () => {
    it('sets isLoading to false and sets data to action payload', () => {
      const mockData: ISearchData = {
        count: 10,
        results: [{ id: 1, background_image: 'https://example.com/image.jpg', name: 'Game 1', platforms: null }],
        next: null,
        prev: null,
      };

      const state = searchReducer(initialState, getResultsSuccess(mockData));

      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockData);
    });
  });

  describe('Get Results Error reducer', () => {
    it('sets isLoading to false and sets error to error message', () => {
      const mockErrorMessage = 'Something went wrong';
      const state = searchReducer(initialState, getResultsError(mockErrorMessage));

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(mockErrorMessage);
    });
  });

  describe('Get Results Query String reducer', () => {
    it('sets queryString to query url', () => {
      const mockQueryString = 'query_string';
      const state = searchReducer(initialState, getCurrentQueryString(mockQueryString));

      expect(state.queryString).toBe(mockQueryString);
    });
  });
});
