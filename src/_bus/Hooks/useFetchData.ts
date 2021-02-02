import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Types
import { InitAsyncACReturnType } from '../Entities/EntitiesTypes';
// Selectors
import { selectDataIsLoading } from '../UI/UISelectors';

export const useFetchData = (hasAllData: boolean, initAsyncAC: () => InitAsyncACReturnType) => {
  const dispatch = useDispatch();
  const isDataLoading = useSelector(selectDataIsLoading);

  useEffect(() => {
    if (hasAllData || isDataLoading) return;
    dispatch(initAsyncAC());
  }, [dispatch, hasAllData, initAsyncAC, isDataLoading]);

  return isDataLoading;
};
