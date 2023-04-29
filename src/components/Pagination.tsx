import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getResultsStart, getResultsSuccess, getResultsError } from '../store/searchSlice';
import styled from 'styled-components';
import { RootState } from '../store';
import fetchData from '../utils/fetchData';
import WrapperContainer from './WrapperContainer';

const PaginationWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  input {
    max-width: 100px;
    background: none;
    border: 1px solid #333;
    border-radius: 8px;
    color: #fff;
    padding: 5px 10px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  p {
    position: absolute;
    font-size: 12px;
    right: 10px;
    top: -8px;
    z-index: 2;
    background: #000;
    padding-inline: 4px;
  }
`;

const Pagination = () => {
  const dispatch = useDispatch();
  const currentQueryString = useSelector((state: RootState) => state.search.queryString);
  const resultsCount = useSelector((state: RootState) => state.search.data?.count);

  const [pageState, setPageState] = useState<number>(1);

  const pageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setPageState(+e.target.value);

  useEffect(() => {
    setPageState(1);
  }, [currentQueryString]);

  const paginationHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentQueryString || !resultsCount) return;

    const numberOfPages = Math.ceil(resultsCount / 10);

    if (+pageState > numberOfPages || +pageState <= 0) {
      return dispatch(getResultsError('Page not found'));
    }

    const url = `${currentQueryString}&page=${pageState}`;
    fetchData(dispatch, getResultsStart, getResultsSuccess, getResultsError, url);
  };

  return (
    <WrapperContainer>
      <PaginationWrapper onSubmit={paginationHandler}>
        <p>Go to page</p>
        <input type='number' value={pageState} onChange={pageChangeHandler} />
      </PaginationWrapper>
    </WrapperContainer>
  );
};

export default Pagination;
