import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocalization } from '@progress/kendo-react-intl';
import { Chart, ChartTitle, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';
// Components
import { Loader } from '../_components';
// Constants
import { WEEK_POINTS } from '../_bus/Constants';
// Hooks
import { useSelectAppointmentsData, useSelectBindDataLengthForAgenda, useFetchAgendaData } from '../Agenda/AgendaHooks';
// Selectors
import { selectAppointmentsSalesChartData, selectStaffUtilizationChartData } from '../_bus/Entities/EntitiesSelectors';

const categories = WEEK_POINTS.map(({ weekNumber }) => weekNumber);

export const Dashboard: FC = (): JSX.Element => {
  const { appointmentsData, isDataLoading } = useSelectAppointmentsData();
  const { customersDataLength, staffDataLength, servicesDataLength } = useSelectBindDataLengthForAgenda();
  const dispatch = useDispatch();
  useFetchAgendaData(appointmentsData.length, servicesDataLength, staffDataLength, customersDataLength, dispatch);

  const { totalChartData, servicesChartData, productChartData } = useSelector(selectAppointmentsSalesChartData());
  const [totalStaffWorkHoursInWeekRange, totalAppointmentHours] = useSelector(selectStaffUtilizationChartData());
  const data = [totalAppointmentHours, totalStaffWorkHoursInWeekRange];
  const percentLabel = () => <h3>{Math.round((totalAppointmentHours * 100) / totalStaffWorkHoursInWeekRange)}%</h3>;

  const contentTSX = !isDataLoading && (
    <div className="card-container row">
      <div className="card-component col-7">
        <h3 className="text-left">Appointment Sales</h3>
        <Chart>
          <ChartTitle text="last 12 weeks" align="left" />
          <ChartSeries>
            <ChartSeriesItem type="line" data={servicesChartData} tooltip={{ visible: true }} />
            <ChartSeriesItem type="line" data={productChartData} tooltip={{ visible: true }} />
            <ChartSeriesItem type="area" data={totalChartData} tooltip={{ visible: true }} />
          </ChartSeries>
          <ChartCategoryAxis>
            <ChartCategoryAxisItem title={{ text: 'Week NUMBER' }} categories={categories} />
          </ChartCategoryAxis>
        </Chart>
      </div>
      <div className="card-component col">
        <h3 className="text-center">Staff Utilization (12 weeks)</h3>
        <Chart donutCenterRender={percentLabel}>
          <ChartSeries>
            <ChartSeriesItem type="donut" data={data} visibleInLegend={false} tooltip={{ visible: true }} holeSize={110} />
          </ChartSeries>
        </Chart>
      </div>
    </div>
  );

  return (
    <>
      {contentTSX}
      <Loader className="mt-5" isLoading={isDataLoading} size={'large'} type="infinite-spinner" />
    </>
  );
};
