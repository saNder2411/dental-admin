import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Action Creators
import { fetchServicesDataInitAsyncAC } from '../../_bus/Entities/EntitiesAC';

export const useFetchServicesData = (servicesDataLength: number, skillsDataLength: number, isDataLoading: boolean) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const hasAllData = servicesDataLength > 0 && skillsDataLength > 0;
    if (hasAllData || isDataLoading) return;
    dispatch(fetchServicesDataInitAsyncAC({ servicesDataLength, skillsDataLength }));
  }, [dispatch, isDataLoading, servicesDataLength, skillsDataLength]);
};
