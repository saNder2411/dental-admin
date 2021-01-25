import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as KendoChart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from '@progress/kendo-react-charts';
// Constants
import { WeekNumbers } from '../../_bus/Chart/ChartHelpers';
// Selectors
import {
  selectAppointmentsSalesChartData,
  selectTotalAppointmentHours,
  selectTotalStaffWorkHoursInWeekRange,
  selectAppointmentPerStaffChartData,
} from '../../_bus/Chart/ChartSelectors';

interface ChartItemProps {
  className?: string;
}

export const ChartAppointmentSales: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const { totalChartData, servicesChartData, productChartData } = useSelector(selectAppointmentsSalesChartData());

  return (
    <section className={className}>
      <h3 className="text-left">Appointment Sales</h3>
      <KendoChart>
        <ChartTitle text="Last 12 weeks" align="left" />
        <ChartLegend position="top" orientation="horizontal" align="start" />
        <ChartSeries>
          <ChartSeriesItem type="line" data={servicesChartData} name="Service" tooltip={{ visible: true }} />
          <ChartSeriesItem type="line" data={productChartData} name="Product" tooltip={{ visible: true }} />
          <ChartSeriesItem type="area" data={totalChartData} name="Total" tooltip={{ visible: true }} />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'WEEK Number' }} categories={WeekNumbers} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartAppointmentsPerStaff: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const [categories, series] = useSelector(selectAppointmentPerStaffChartData());

  return (
    <section className={className}>
      <h3 className="text-left">Appointments / Staff</h3>
      <KendoChart>
        <ChartTitle text="Average per week" align="left" />
        <ChartLegend position="top" orientation="horizontal" align="start" />
        <ChartSeries>
          {series.map((item, idx) => (
            <ChartSeriesItem key={idx} type="column" data={item.data} name={item.name} tooltip={{ visible: true }} />
          ))}
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartStaffEmployment: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalAppointmentHours = useSelector(selectTotalAppointmentHours);
  const totalStaffWorkHoursInWeekRange = useSelector(selectTotalStaffWorkHoursInWeekRange);
  const data = [
    { name: 'Total Appointment Hours', share: totalAppointmentHours },
    { name: 'Total Staff Work Hours', share: totalStaffWorkHoursInWeekRange },
  ];

  const percentLabel = () => <h3>{Math.round((totalAppointmentHours * 100) / totalStaffWorkHoursInWeekRange)}%</h3>;

  return (
    <section className={className}>
      <h3 className="text-center">Staff Employment</h3>
      <KendoChart donutCenterRender={percentLabel}>
        <ChartTitle text="Last 12 weeks" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            overlay={{
              gradient: 'sharpBevel',
            }}
            tooltip={{ visible: true }}
            data={data}
            categoryField="name"
            field="share"
            holeSize={80}
          />
        </ChartSeries>
      </KendoChart>
    </section>
  );
};
