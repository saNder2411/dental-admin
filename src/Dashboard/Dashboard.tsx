import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { Chart } from '../_sections/Chart';
import { Loader } from '../_components';
// Action Creators
import { fetchAppointmentsDataInitAsyncAC, calcChartDataAC } from '../_bus/Entities/EntitiesAC';
// Selectors
import { selectOriginalAppointmentsData } from '../_bus/Entities/EntitiesSelectors';
import { selectTotalAppointmentHours } from '../_bus/Entities/EntitiesChartSelectors';
// Hooks
import { useSelectBindDataLengthForAgenda } from '../Agenda/AgendaHooks';
import { useFetchData } from '../_bus/Hooks/useFetchData';

export const Dashboard: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const totalAppointmentHours = useSelector(selectTotalAppointmentHours);
  const appointmentsData = useSelector(selectOriginalAppointmentsData);
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const hasAllData = appointmentsData.length > 0 && servicesDataLength > 0 && staffDataLength > 0 && customersDataLength > 0;
  const initAsyncAC = useCallback(
    () =>
      fetchAppointmentsDataInitAsyncAC({ appointmentsDataLength: appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength }),
    [appointmentsData.length, customersDataLength, servicesDataLength, staffDataLength]
  );
  const isDataLoading = useFetchData(hasAllData, initAsyncAC);

  // useEffect(() => {
  //   if (hasAllData && totalAppointmentHours === 0) {
  //     dispatch(calcChartDataAC());
  //   }
  // }, [dispatch, hasAllData, isDataLoading, totalAppointmentHours]);

  const contentTSX = hasAllData && !isDataLoading && totalAppointmentHours > 0 && <Chart />;

  return (
    <>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading || totalAppointmentHours === 0} size={'large'} type="infinite-spinner" />
    </>
  );
};
