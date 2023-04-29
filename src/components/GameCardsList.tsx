import { useSelector } from 'react-redux';
import type { RootState } from '../store';

import styled from 'styled-components';
import GameCard from './GameCard';
import WrapperContainer from './WrapperContainer';

const Container = styled(WrapperContainer)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const GameCardsListContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const InfoBox = styled(Container)`
  text-align: center;
`;

const GameCardsList = () => {
  const { data, isLoading, error } = useSelector((state: RootState) => state.search);

  if (error) {
    if (error === 'Failed to fetch') {
      return <InfoBox>Invalid API key</InfoBox>;
    }
    return <InfoBox>{error}</InfoBox>;
  }

  if (!data && isLoading) {
    return <InfoBox>Loading...</InfoBox>;
  }

  if (data?.results.length === 0 && !isLoading) {
    return <InfoBox>No results found.</InfoBox>;
  }

  if (!data && !isLoading) {
    return (
      <InfoBox>
        Start by entering valid API key and game you are looking for (if you want to get all games leave the search
        input empty)
      </InfoBox>
    );
  }

  return (
    <GameCardsListContainer>
      {data?.results.map(result => {
        if (result.platforms) {
          const platforms = result.platforms.map(platform => platform.platform.name);
          return <GameCard key={result.id} image={result.background_image} title={result.name} platforms={platforms} />;
        } else {
          return <GameCard key={result.id} image={result.background_image} title={result.name} />;
        }
      })}
    </GameCardsListContainer>
  );
};

export default GameCardsList;
