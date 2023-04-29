import styled from 'styled-components';
import gamepad from '../assets/gamepad.svg';
import SearchForm from './SearchForm';
import WrapperContainer from './WrapperContainer';

const HeaderWrapper = styled.header`
  background: #333;
  width: 100%;
`;

const HeaderContainer = styled(WrapperContainer)`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  width: 200px;

  img {
    max-width: 40px;
    filter: invert(1);
    margin-right: 10px;
  }

  @media screen and (max-width: 767px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderLogo>
          <img src={gamepad} alt='Gamepad' />
          <p>Games DB</p>
        </HeaderLogo>
        <SearchForm />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
