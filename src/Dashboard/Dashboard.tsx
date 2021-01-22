import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
// Components
import { Chart } from '../_sections/Chart';
import { Loader } from '../_components';
// Hooks
import { useSelectAppointmentsData, useSelectBindDataLengthForAgenda, useFetchAgendaData } from '../Agenda/AgendaHooks';

export const Dashboard: FC = (): JSX.Element => {
  const { appointmentsData, isDataLoading } = useSelectAppointmentsData();
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const dispatch = useDispatch();
  useFetchAgendaData(appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength, dispatch);

  const contentTSX = !isDataLoading && <Chart />;

  return (
    <>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </>
  );
};
