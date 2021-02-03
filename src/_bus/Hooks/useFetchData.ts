import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Types
import { InitAsyncACReturnType } from '../Entities/EntitiesTypes';
// Selectors
import { selectDataIsLoading, selectDataErrorMessage } from '../UI/UISelectors';

export const useFetchData = (hasAllData: boolean, initAsyncAC: () => InitAsyncACReturnType) => {
  const dispatch = useDispatch();
  const isDataLoading = useSelector(selectDataIsLoading);
  const errorMessage = useSelector(selectDataErrorMessage);

  useEffect(() => {
    if (hasAllData || isDataLoading || errorMessage) return;
    dispatch(initAsyncAC());
  }, [dispatch, errorMessage, hasAllData, initAsyncAC, isDataLoading]);

  return isDataLoading;
};
