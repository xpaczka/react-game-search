import styled from 'styled-components';

const GameCardContainer = styled.div`
  background: #444;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const GameCardInfo = styled.div`
  padding: 20px 10px;
`;

const GameCardImage = styled.div`
  aspect-ratio: 16 / 9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GameCardHeader = styled.p`
  font-size: 16px;
`;

const GameCardPlatforms = styled.p`
  font-size: 12px;
  color: #bbb;
`;

interface IGameCard {
  image: string;
  title: string;
  platforms?: string[];
}

const GameCard = ({ image, title, platforms }: IGameCard) => {
  let formattedPlatformsString: string = '';

  if (platforms) {
    const visibleInfo = platforms.slice(0, 3);
    const additionalInfo = platforms.slice(3).length;

    formattedPlatformsString = `${visibleInfo.join(', ')}${additionalInfo > 0 ? ` and ${additionalInfo} more` : ''}`;
  }

  return (
    <GameCardContainer>
      <GameCardImage>
        <img src={image} alt={title} />
      </GameCardImage>
      <GameCardInfo>
        <GameCardHeader>{title}</GameCardHeader>
        {platforms && <GameCardPlatforms>{formattedPlatformsString}</GameCardPlatforms>}
      </GameCardInfo>
    </GameCardContainer>
  );
};

export default GameCard;
