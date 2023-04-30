import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';

import fetchData from '../utils/fetchData';
import { getResultsStart, getResultsSuccess, getResultsError, getCurrentQueryString } from '../store/searchSlice';
import { ISearchData } from '../store/searchSlice';

const API_KEY = process.env.API_KEY;
const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`;

jest.mock('../store/searchSlice');

describe('Fetch data function', () => {
  const dispatch = jest.fn() as Dispatch<AnyAction>;

  afterEach(() => jest.clearAllMocks());

  it('starts data fetching', async () => {
    await fetchData(dispatch, getResultsStart, getResultsSuccess, getResultsError, url);
    expect(dispatch).toHaveBeenCalledWith(getResultsStart());
  });

  it('returns fetched data on successfull request', async () => {
    const data: ISearchData = { count: 5, results: [], next: null, prev: null };
    const json = jest.fn().mockResolvedValue(data);
    const response = { ok: true, json };
    jest.spyOn(global, 'fetch').mockResolvedValue(response as unknown as Promise<Response>);

    await fetchData(dispatch, getResultsStart, getResultsSuccess, getResultsError, url);
    expect(fetch).toHaveBeenCalledWith(url);
    expect(json).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(getResultsSuccess(data));
  });

  it('return error on unsuccessfull request', async () => {
    const response = { ok: false };
    jest.spyOn(global, 'fetch').mockResolvedValue(response as unknown as Promise<Response>);

    await fetchData(dispatch, getResultsStart, getResultsSuccess, getResultsError, url);
    expect(fetch).toHaveBeenCalledWith(url);
    expect(dispatch).toHaveBeenCalledWith(getResultsError('Something went wrong'));
  });

  it('updates query string if requested', async () => {
    await fetchData(dispatch, getResultsStart, getResultsSuccess, getResultsError, url, getCurrentQueryString);
    expect(dispatch).toHaveBeenCalledWith(getCurrentQueryString(url));
  });
});
