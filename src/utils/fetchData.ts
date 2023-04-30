import { Dispatch } from 'react';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, AnyAction } from '@reduxjs/toolkit';

import { ISearchData } from '../store/searchSlice';

const fetchData = async (
  dispatch: Dispatch<AnyAction>,
  start: ActionCreatorWithoutPayload,
  success: ActionCreatorWithPayload<ISearchData>,
  error: ActionCreatorWithPayload<string>,
  url: string,
  queryString?: ActionCreatorWithPayload<string>
): Promise<void> => {
  try {
    dispatch(start());

    const response = await fetch(url);
    if (!response.ok) throw new Error('Something went wrong');

    const data = await response.json();
    dispatch(success(data));

    if (queryString) {
      dispatch(queryString(url));
    }
  } catch (err: any) {
    dispatch(error(err.message));
  }
};

export default fetchData;
