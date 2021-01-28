import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchStaffDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchStaffData = (staffDataLength: number, skillsDataLength: number, isDataLoading: boolean, dispatch: Dispatch) =>
  useEffect(() => {
    if ((staffDataLength > 0 && skillsDataLength > 0) || isDataLoading) return;
    dispatch(fetchStaffDataInitAsyncAC({ staffDataLength, skillsDataLength }));
  }, [dispatch, isDataLoading, skillsDataLength, staffDataLength]);
