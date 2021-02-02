import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
// Components
import { Chart } from '../_sections/Chart';
import { Loader } from '../_components';
// Action Creators
import { fetchAppointmentsDataInitAsyncAC } from '../_bus/Entities/EntitiesAC';
// Selectors
import { selectOriginalAppointmentsData } from '../_bus/Entities/EntitiesSelectors';
// Hooks
import { useSelectBindDataLengthForAgenda } from '../Agenda/AgendaHooks';
import { useFetchData } from '../_bus/Hooks/useFetchData';
// Selectors

export const Dashboard: FC = (): JSX.Element => {
  const appointmentsData = useSelector(selectOriginalAppointmentsData);
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const hasAllData = appointmentsData.length > 0 && servicesDataLength > 0 && staffDataLength > 0 && customersDataLength > 0;
  const initAsyncAC = useCallback(
    () =>
      fetchAppointmentsDataInitAsyncAC({ appointmentsDataLength: appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength }),
    [appointmentsData.length, customersDataLength, servicesDataLength, staffDataLength]
  );
  const isDataLoading = useFetchData(hasAllData, initAsyncAC);

  const contentTSX = hasAllData && !isDataLoading && <Chart />;

  return (
    <>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </>
  );
};
