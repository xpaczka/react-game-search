import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SearchForm from '../components/SearchForm';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState } from '../store';

const mockStore = configureStore<RootState, any>([]);

describe('Search Form component', () => {
  let store: MockStoreEnhanced<RootState, any>;

  beforeEach(() => {
    store = mockStore({
      search: { isLoading: false, error: null, queryString: null, data: null },
    });
  });

  it('renders search input and API key input', () => {
    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search for games')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('XXXXXXXXXXXXXXXX')).toBeInTheDocument();
  });
});
