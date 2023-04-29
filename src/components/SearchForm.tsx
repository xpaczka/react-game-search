import { FormEvent, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import search from '../assets/search.svg';
import key from '../assets/key.svg';

import { getResultsStart, getResultsSuccess, getResultsError, getCurrentQueryString } from '../store/searchSlice';
import fetchData from '../utils/fetchData';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  img {
    max-width: 16px;
    max-height: 16px;
    object-fit: contain;
    margin-right: 10px;
    filter: invert(1);
    position: absolute;
    left: 15px;
  }

  input {
    background: none;
    padding: 5px 10px 5px 45px;
    color: #fff;
    border-radius: 8px;
    outline: none;
    border: 1px solid #666;
  }

  @media screen and (max-width: 575px) {
    width: 100%;

    input {
      width: 100%;
    }
  }
`;

const SearchFormWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  button {
    display: none;
  }

  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
`;

const SearchFormInput = styled(FlexContainer)`
  flex: 1;
  margin-right: 10px;

  input {
    width: 100%;
  }

  @media screen and (max-width: 575px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const SearchForm = () => {
  const dispatch = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const apiKeyRef = useRef<HTMLInputElement>(null);

  const searchHandler = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const searchValue = searchInputRef.current?.value;
    const apiKeyValue = apiKeyRef.current?.value;
    const formattedSearchQuery = searchValue?.toLowerCase().replaceAll(' ', '-');

    if (!apiKeyValue) {
      return dispatch(getResultsError('Please provide valid API Key'));
    }

    const url = `https://api.rawg.io/api/games?key=${apiKeyValue}&page_size=10${
      searchValue ? `&search=${formattedSearchQuery}` : ''
    }`;

    fetchData(dispatch, getResultsStart, getResultsSuccess, getResultsError, url, getCurrentQueryString);
  }, []);

  return (
    <SearchFormWrapper onSubmit={searchHandler}>
      <SearchFormInput>
        <img src={search} alt='Search' />
        <input type='text' placeholder='Search for games' ref={searchInputRef} />
      </SearchFormInput>
      <FlexContainer>
        <img src={key} alt='Key' />
        <input type='text' placeholder='XXXXXXXXXXXXXXXX' ref={apiKeyRef} />
      </FlexContainer>
      <button type='submit'></button>
    </SearchFormWrapper>
  );
};

export default SearchForm;
