import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Action Creators
import { fetchStaffDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchStaffData = (staffDataLength: number, skillsDataLength: number, dispatch: Dispatch) =>
  useEffect(() => {
    if (staffDataLength > 0) return;
    dispatch(fetchStaffDataInitAsyncAC({ skillsDataLength }));
  }, [dispatch, skillsDataLength, staffDataLength]);
