import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GameCard from '../components/GameCard';

describe('Game Card component', () => {
  const gameCardProps = {
    image: 'image.jpg',
    title: 'Test',
    platforms: ['PC', 'PlayStation 4'],
  };

  it('should render image with title as alt text', () => {
    render(<GameCard {...gameCardProps} />);
    const image = screen.getByRole('img', { name: gameCardProps.title });

    expect(image).toHaveAttribute('src', gameCardProps.image);
    expect(image).toHaveAttribute('alt', gameCardProps.title);
  });

  it('should render title', () => {
    render(<GameCard {...gameCardProps} />);
    const title = screen.getByText(gameCardProps.title);

    expect(title).toBeInTheDocument();
  });

  it('should render platforms in valid format', () => {
    render(<GameCard {...gameCardProps} />);
    const platforms = screen.getByText('PC, PlayStation 4');

    expect(platforms).toBeInTheDocument();
  });

  it('should not render platforms if not provided', () => {
    const noPlatformsGameCardProps = { image: 'image.jpg', title: 'Test' };
    render(<GameCard {...noPlatformsGameCardProps} />);
    const platforms = screen.queryByText('PC, PlayStation 4');

    expect(platforms).not.toBeInTheDocument();
  });
});
