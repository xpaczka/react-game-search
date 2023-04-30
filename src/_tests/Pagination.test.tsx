import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Pagination from '../components/Pagination';
import { RootState } from '../store';

const mockStore = configureStore<RootState, any>([]);

describe('Pagination component', () => {
  let store: MockStoreEnhanced<RootState, any>;
  let input: any;

  beforeEach(() => {
    store = mockStore({
      search: { isLoading: false, error: null, queryString: null, data: null },
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    input = screen.getByLabelText('Go to page');
  });

  it('renders form with number type input and label', () => {
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
    expect(screen.getByText('Go to page')).toBeInTheDocument();
  });

  it('changes input value to 1 when queryString is updated', () => {
    expect(input).toHaveValue(1);

    store = mockStore({
      search: {
        isLoading: false,
        error: null,
        queryString: null,
        data: { count: 30, results: [], prev: null, next: null },
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    expect(input).toHaveValue(1);
  });
});
