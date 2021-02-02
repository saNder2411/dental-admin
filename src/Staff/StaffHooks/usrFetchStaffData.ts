import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Action Creators
import { fetchStaffDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchStaffData = (staffDataLength: number, skillsDataLength: number, isDataLoading: boolean) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const hasAllData = staffDataLength > 0 && skillsDataLength > 0;
    if (hasAllData || isDataLoading) return;
    dispatch(fetchStaffDataInitAsyncAC({ staffDataLength, skillsDataLength }));
  }, [dispatch, isDataLoading, skillsDataLength, staffDataLength]);
};
