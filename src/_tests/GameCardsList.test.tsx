import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import GameCardsList from '../components/GameCardsList';
import { IGameData } from '../store/searchSlice';

jest.mock('react-redux');

describe('Game Cards List component', () => {
  const selector = useSelector as jest.Mock;

  it('renders loading state when waiting for request to be fulfilled', () => {
    selector.mockReturnValueOnce({ data: null, isLoading: true });

    render(<GameCardsList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders no results message when is not loading and there is no data', () => {
    selector.mockReturnValueOnce({ data: { results: [] }, isLoading: false });

    render(<GameCardsList />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders error message when there is an error in request', () => {
    const errorMessage = 'Error message';
    selector.mockReturnValueOnce({ error: errorMessage });

    render(<GameCardsList />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders invalid API key message when the provided API key is invalid', () => {
    selector.mockReturnValueOnce({ error: 'Failed to fetch' });

    render(<GameCardsList />);
    expect(screen.getByText('Invalid API key')).toBeInTheDocument();
  });

  it('renders start message when no requests have been made', () => {
    selector.mockReturnValueOnce({ data: null, isLoading: false, error: null, queryString: null });

    render(<GameCardsList />);
    expect(
      screen.getByText(
        'Start by entering valid API key and game you are looking for (if you want to get all games leave the search input empty)'
      )
    ).toBeInTheDocument();
  });

  it('renders GameCard component for each element in data', () => {
    const results: IGameData[] = [
      {
        id: 1,
        name: 'Game 1',
        background_image: 'img1.jpg',
        platforms: [{ platform: { name: 'Platform 1' } }, { platform: { name: 'Platform 2' } }],
      },
      {
        id: 2,
        name: 'Game 2',
        background_image: 'img2.jpg',
        platforms: [{ platform: { name: 'Platform 3' } }, { platform: { name: 'Platform 4' } }],
      },
    ];

    selector.mockReturnValueOnce({ data: { results }, isLoading: false });
    render(<GameCardsList />);

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByAltText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Platform 1, Platform 2')).toBeInTheDocument();

    expect(screen.getByText('Game 2')).toBeInTheDocument();
    expect(screen.getByAltText('Game 2')).toBeInTheDocument();
    expect(screen.getByText('Platform 3, Platform 4')).toBeInTheDocument();
  });
});
