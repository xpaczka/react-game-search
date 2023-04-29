import styled from 'styled-components';

export default styled.div`
  max-width: 1355px;
  margin-inline: auto;
  padding-inline: 40px;

  @media screen and (max-width: 1024px) {
    padding-inline: 20px;
  }

  @media screen and (max-width: 575px) {
    padding-inline: 10px;
  }
`;
