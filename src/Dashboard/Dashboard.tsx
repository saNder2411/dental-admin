import React, { FC } from 'react';
// Components
import { Chart } from '../_sections/Chart';
import { Loader } from '../_components';
// Hooks
import { useSelectAppointmentsData, useSelectBindDataLengthForAgenda, useFetchAgendaData } from '../Agenda/AgendaHooks';
// Selectors

export const Dashboard: FC = (): JSX.Element => {
  const { appointmentsData, isDataLoading } = useSelectAppointmentsData();
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  useFetchAgendaData(appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength, isDataLoading);

  const hasAllData = appointmentsData.length > 0 && servicesDataLength > 0 && staffDataLength > 0 && customersDataLength > 0;

  const contentTSX = hasAllData && !isDataLoading && <Chart />;

  return (
    <>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </>
  );
};
