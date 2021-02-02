import React, { FC } from 'react';
import { useSelector } from 'react-redux';
// Components
import { Chart } from '../_sections/Chart';
import { Loader } from '../_components';
// Hooks
import { useSelectAppointmentsData, useSelectBindDataLengthForAgenda, useFetchAgendaData } from '../Agenda/AgendaHooks';
// Selectors
import { selectTotalAppointmentHours } from '../_bus/Entities/EntitiesChartSelectors';

export const Dashboard: FC = (): JSX.Element => {
  const { appointmentsData, isDataLoading } = useSelectAppointmentsData();
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const appointmentTotalHours = useSelector(selectTotalAppointmentHours);
  useFetchAgendaData(appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength, isDataLoading);
  // const renders = useRef(0);

  const contentTSX = appointmentTotalHours > 0 && !isDataLoading && <Chart />;

  return (
    <>
      {/* {renders.current++} */}
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </>
  );
};
