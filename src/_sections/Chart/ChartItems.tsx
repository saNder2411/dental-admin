import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as KendoChart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartSeriesLabels,
  ChartTooltip,
  TooltipContext,
  SharedTooltipContext,
} from '@progress/kendo-react-charts';
import { ArcGauge, LinearGauge } from '@progress/kendo-react-gauges';
// Constants
import { WeekNumbers } from '../../_bus/Entities/EntitiesChartHelpers';
import { SeriesColors } from '../../_bus/Constants';
// Selectors
import {
  selectTotalSalesForEveryWeekInWeekRange,
  selectServiceSalesForEveryWeekInWeekRange,
  selectProductSalesForEveryWeekInWeekRange,
  selectCategoriesAppointmentPerStaff,
  selectSeriesAppointmentPerStaff,
  selectAverageHourlyPerService,
  selectAppointmentFunnel,
  selectTotalAppointmentHours,
  selectTotalStaffWorkHoursInWeekRange,
  selectTotalServiceSales,
  selectTotalServiceHours,
  selectTotalAppointmentSales,
  selectAmountActiveCustomers,
} from '../../_bus/Entities/EntitiesChartSelectors';

interface ChartItemProps {
  className?: string;
}

const TooltipRender = ({ point }: TooltipContext & SharedTooltipContext): ReactNode => point?.category;

export const ChartAppointmentSales: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalSalesForEveryWeek = useSelector(selectTotalSalesForEveryWeekInWeekRange);
  const servicesSalesForEveryWeek = useSelector(selectServiceSalesForEveryWeekInWeekRange);
  const productSalesForEveryWeek = useSelector(selectProductSalesForEveryWeekInWeekRange);

  return (
    <section className={className}>
      <h3 className="text-left">Appointment Sales</h3>
      <KendoChart>
        <ChartTitle text="Last 12 weeks" align="left" />
        <ChartLegend position="top" orientation="horizontal" align="start" />
        <ChartSeries>
          <ChartSeriesItem type="line" data={productSalesForEveryWeek} name="Product" tooltip={{ visible: true }} />
          <ChartSeriesItem type="line" data={servicesSalesForEveryWeek} name="Service" tooltip={{ visible: true }} />
          <ChartSeriesItem type="area" data={totalSalesForEveryWeek} name="Total" tooltip={{ visible: true }} />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'WEEK Number' }} categories={WeekNumbers} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartAppointmentsPerStaff: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const categories = useSelector(selectCategoriesAppointmentPerStaff);
  const series = useSelector(selectSeriesAppointmentPerStaff);

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
  const servicesSalesForEveryWeek = useSelector(selectServiceSalesForEveryWeekInWeekRange);
  const productSalesForEveryWeek = useSelector(selectProductSalesForEveryWeekInWeekRange);
  const series = [
    { name: 'Product', data: productSalesForEveryWeek },
    { name: 'Service', data: servicesSalesForEveryWeek },
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
  const data = useSelector(selectAverageHourlyPerService);

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

export const ChartAppointmentFunnel: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const data = useSelector(selectAppointmentFunnel());
  console.log(data);

  return (
    <section className={className}>
      <h3 className="text-center">Appointment Funnel</h3>
      <KendoChart style={{ margin: '0 auto', width: '90%' }}>
        <ChartTitle text="Next 12 weeks" />
        <ChartSeries>
          <ChartSeriesItem type="funnel" data={data} categoryField="stat" field="data" colorField="color" dynamicSlope dynamicHeight={false}>
            <ChartSeriesLabels color="white" background="none" format="N0" />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartTooltip render={TooltipRender as any} />
        <ChartLegend visible={false} />
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
  const sales = useSelector(selectTotalServiceSales);
  const hours = useSelector(selectTotalServiceHours);
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
