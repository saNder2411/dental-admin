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
import { ArcGauge, LinearGauge } from '@progress/kendo-react-gauges';
// Constants
import { WeekNumbers } from '../../_bus/Chart/ChartHelpers';
import { SeriesColors } from '../../_bus/Constants';
// Selectors
import {
  selectAppointmentsSalesChartData,
  selectTotalAppointmentHours,
  selectTotalStaffWorkHoursInWeekRange,
  selectAppointmentPerStaffChartData,
  selectAverageHourlyPerServiceChartData,
  selectAverageHourlyPerAllServiceChartData,
  selectTotalAppointmentSales,
  selectAmountActiveCustomers,
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
          <ChartSeriesItem type="line" data={productChartData} name="Product" tooltip={{ visible: true }} />
          <ChartSeriesItem type="line" data={servicesChartData} name="Service" tooltip={{ visible: true }} />
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
          {series.map(({ data, name }) => (
            <ChartSeriesItem key={Math.random()} type="column" data={data} name={name} tooltip={{ visible: true }} />
          ))}
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'STAFF' }} categories={categories} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartServiceSales: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const { servicesChartData, productChartData } = useSelector(selectAppointmentsSalesChartData());
  const series = [
    { name: 'Product', data: productChartData },
    { name: 'Service', data: servicesChartData },
  ];

  return (
    <section className={className}>
      <h3 className="text-left">Product / Service Sales</h3>
      <KendoChart>
        <ChartTitle text="Last 12 weeks" align="left" />
        <ChartLegend position="top" orientation="horizontal" align="start" />
        <ChartSeries>
          {series.map(({ data, name }) => (
            <ChartSeriesItem key={Math.random()} type="column" data={data} name={name} tooltip={{ visible: true }} />
          ))}
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'WEEK Number' }} categories={WeekNumbers} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartAverageHourlyPerService: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const data = useSelector(selectAverageHourlyPerServiceChartData());

  return (
    <section className={className}>
      <h3 className="text-center">Average Hourly $ Per Service</h3>
      <KendoChart seriesColors={SeriesColors}>
        <ChartTitle text="Last 12 weeks" />
        <ChartLegend position="top" orientation="vertical" />
        <ChartSeries>
          <ChartSeriesItem
            type="pie"
            overlay={{
              gradient: 'sharpBevel',
            }}
            tooltip={{ visible: true }}
            data={data}
            colorField="color"
            categoryField="name"
            field="data"
          />
        </ChartSeries>
      </KendoChart>
    </section>
  );
};

export const ChartStaffEmployment: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalAppointmentHours = useSelector(selectTotalAppointmentHours);
  const totalStaffWorkHoursInWeekRange = useSelector(selectTotalStaffWorkHoursInWeekRange);
  const value = totalAppointmentHours !== 0 ? Math.round((totalAppointmentHours * 100) / totalStaffWorkHoursInWeekRange) : 0;

  return (
    <section className={className}>
      <h3 className="mb-2">Staff Employment</h3>
      <div className="text-muted mb-4 pt-1">Last 12 weeks</div>
      <ArcGauge value={value} arcCenterRender={(currentValue: number, color: string) => <h3 style={{ color: color }}>{currentValue}%</h3>} />
    </section>
  );
};

export const ChartAverageHourlyPerAllServices: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const [sales, hours] = useSelector(selectAverageHourlyPerAllServiceChartData());
  const value = sales !== 0 ? Math.round(sales / hours) : 0;

  return (
    <section className={className}>
      <h3 className="mb-2">Average Hourly $ Per All Services</h3>
      <div className="text-muted mb-3 pt-1">Last 12 weeks</div>
      <LinearGauge pointer={{ value, color: '#28b4c8', size: 40 }} scale={{ max: value + 20 }} style={{ height: 320 }} />
    </section>
  );
};

export const ChartAverageCustomerOrders: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalSales = useSelector(selectTotalAppointmentSales);
  const amountActiveCustomers = useSelector(selectAmountActiveCustomers);
  const value = totalSales !== 0 ? Math.round(totalSales / amountActiveCustomers) : 0;

  return (
    <section className={className}>
      <h3 className="mb-2">Average Customer Orders</h3>
      <div className="text-muted mb-3 pt-1">Last 12 weeks</div>
      <LinearGauge pointer={{ value, color: '#f6d245', size: 40 }} scale={{ max: value + 20, minorUnit: 1, majorUnit: 10 }} style={{ height: 320 }} />
    </section>
  );
};
