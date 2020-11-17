import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { DomainsStateActions } from '../GridTypes';

export const useFetchDataForDomain = (domainDataLength: number, domainStateActions: DomainsStateActions, dispatch: Dispatch) => {
  useEffect(() => {
    if (domainDataLength > 0) return;

    domainStateActions.fetchData(dispatch);
  }, [dispatch, domainStateActions, domainDataLength]);
};
