import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import App from '../App';
import { RootState } from '../store';

const mockStore = configureStore<RootState, any>([]);

describe('App Component', () => {
  let store: MockStoreEnhanced<RootState, any>;

  beforeEach(() => {
    store = mockStore({
      search: { isLoading: false, error: null, queryString: null, data: null },
    });
  });

  it('should render Header and GameCardsList components', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Start by entering valid API key and game you are looking for (if you want to get all games leave the search input empty)'
      )
    ).toBeInTheDocument();
  });

  it('should render Pagination components if there are any results', () => {
    store = mockStore({
      search: {
        isLoading: false,
        error: null,
        queryString: null,
        data: { count: 5, results: [], prev: null, next: null },
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByLabelText('Go to page')).toBeInTheDocument();
  });
});
