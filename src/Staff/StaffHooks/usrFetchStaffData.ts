import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchStaffDataInitAsyncAC } from '../../_sections/Grid/GridAC';

export const useFetchStaffData = (staffDataLength: number, dispatch: Dispatch) =>
  useEffect(() => {
    if (staffDataLength > 0) return;
    dispatch(fetchStaffDataInitAsyncAC());
  }, [dispatch, staffDataLength]);