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
import { WeekNumbers, MonthNames } from '../../_bus/Entities/EntitiesChartHelpers';
import { SeriesColors, WEEK_RANGE, MONTH_RANGE } from '../../_bus/Constants';
// Selectors
import {
  selectTotalSalesForEveryWeekInWeekRange,
  selectServiceSalesForEveryWeekInWeekRange,
  selectProductSalesForEveryWeekInWeekRange,
  selectTotalAmountAppointmentsForEveryWeekPerWeekRange,
  selectTotalProductUnitsForEveryWeekPerWeekRange,
  selectAmountNewCustomerAppointmentsForEveryWeekPerWeekRange,
  selectAmountExistCustomerAppointmentsForEveryWeekPerWeekRange,
  selectStaffCategories,
  selectSeriesStaffStatistic,
  selectAverageHourlyPerService,
  selectAverageHourlyRateAllServices,
  selectAppointmentFunnel,
  selectTotalAppointmentHours,
  selectTotalStaffWorkHoursInWeekRange,
  // selectTotalServiceSales,
  selectTotalAppointmentSalesPerLast12Months,
  selectAmountActiveCustomers,
  selectSalesPerStaffPerWeekData,
  selectServiceCategories,
  selectProductCategories,
  selectSalesPerServicePerMonthSeries,
  selectSalesPerProductPerMonthSeries,
  selectSalesPerOtherServicePerMonthSeries,
  selectCanceledAppointment,
  selectAmountAppointmentPerNextWeekRangeAndLastWeek,
  selectAppointmentValue,
} from '../../_bus/Entities/EntitiesChartSelectors';
// Helpers
import { getPercentFromFull } from '../../_bus/Entities/EntitiesChartHelpers';

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
        <ChartTitle text={`Last ${WEEK_RANGE} weeks`} align="left" />
        <ChartLegend position="top" orientation="horizontal" align="start" />
        <ChartSeries>
          <ChartSeriesItem type="line" data={productSalesForEveryWeek} name="Product" color="#4ca8df" tooltip={{ visible: true }} />
          <ChartSeriesItem type="line" data={servicesSalesForEveryWeek} name="Service" color="#367ea2" tooltip={{ visible: true }} />
          <ChartSeriesItem type="area" data={totalSalesForEveryWeek} name="Total" tooltip={{ visible: true }} />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'WEEK Number' }} categories={WeekNumbers} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartSalesAndAppointments: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalAmountAppointmentsForEveryWeek = useSelector(selectTotalAmountAppointmentsForEveryWeekPerWeekRange);
  const totalAmountProductUnitsForEveryWeek = useSelector(selectTotalProductUnitsForEveryWeekPerWeekRange);

  return (
    <section className={className}>
      <h3 className="text-left">Sales & Appointments</h3>
      <KendoChart>
        <ChartTitle text={`Last ${WEEK_RANGE} weeks`} align="left" />
        <ChartLegend position="top" orientation="horizontal" align="start" />
        <ChartSeries>
          <ChartSeriesItem type="line" data={totalAmountAppointmentsForEveryWeek} name="Appointments Made" color="#367ea2" tooltip={{ visible: true }} />
          <ChartSeriesItem type="line" data={totalAmountProductUnitsForEveryWeek} name="Product Units" color="#4ca8df" tooltip={{ visible: true }} />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'WEEK Number' }} categories={WeekNumbers} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartAppointmentsPerWeek: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalAmountAppointmentsForEveryWeek = useSelector(selectTotalAmountAppointmentsForEveryWeekPerWeekRange);
  const amountNewCustomerAppointmentsForEveryWeek = useSelector(selectAmountNewCustomerAppointmentsForEveryWeekPerWeekRange);
  const amountExistCustomerAppointmentsForEveryWeek = useSelector(selectAmountExistCustomerAppointmentsForEveryWeekPerWeekRange);

  return (
    <section className={className}>
      <h3 className="text-left">Appointments Per Week</h3>
      <KendoChart>
        <ChartTitle text={`Last ${WEEK_RANGE} weeks`} align="left" />
        <ChartLegend position="top" orientation="horizontal" align="start" />
        <ChartSeries>
          <ChartSeriesItem type="line" data={amountNewCustomerAppointmentsForEveryWeek} name="New Customers" tooltip={{ visible: true }} />
          <ChartSeriesItem type="line" data={amountExistCustomerAppointmentsForEveryWeek} name="Customers" color="#ec8237" tooltip={{ visible: true }} />
          <ChartSeriesItem type="area" data={totalAmountAppointmentsForEveryWeek} name="Total Appointments" tooltip={{ visible: true }} />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'WEEK Number' }} categories={WeekNumbers} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartStaffStatistics: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const categories = useSelector(selectStaffCategories);
  const series = useSelector(selectSeriesStaffStatistic());

  return (
    <section className={className}>
      <h3 className="text-left">Staff Statistics</h3>
      <KendoChart>
        <ChartTitle text={`Average weekly for the last ${WEEK_RANGE} weeks`} align="left" />
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

export const ChartAppointmentValue: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const series = useSelector(selectAppointmentValue);

  return (
    <section className={className}>
      <h3 className="text-center">Average Appointment Value</h3>
      <KendoChart>
        <ChartTitle text={`Last ${MONTH_RANGE} months`} align="center" />
        <ChartSeries>
          <ChartSeriesItem type="column" data={series} color={SeriesColors[2]} tooltip={{ visible: true }} />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'MONTHS' }} categories={MonthNames} labels={{ rotation: 'auto' }} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartSalesByOfferingCategory: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const serviceCategories = useSelector(selectServiceCategories);
  const productCategories = useSelector(selectProductCategories);
  const salesPerServicePerMonthSeries = useSelector(selectSalesPerServicePerMonthSeries);
  const salesPerProductPerMonthSeries = useSelector(selectSalesPerProductPerMonthSeries);
  const salesPerOtherServicePerMonthSeries = useSelector(selectSalesPerOtherServicePerMonthSeries);
  const series = [...salesPerServicePerMonthSeries, ...salesPerProductPerMonthSeries, ...salesPerOtherServicePerMonthSeries];

  return (
    <section className={className}>
      <h3 className="text-left">Sales by Offering Category</h3>
      <KendoChart>
        <ChartTitle text={`Average monthly for the last ${MONTH_RANGE} months`} align="left" />
        <ChartSeries>
          <ChartSeriesItem type="column" data={series} field="data" colorField="color" tooltip={{ visible: true }} />
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem title={{ text: 'CATEGORY' }} categories={[...serviceCategories, ...productCategories, 'Other']} labels={{ rotation: 'auto' }} />
        </ChartCategoryAxis>
      </KendoChart>
    </section>
  );
};

export const ChartAppointmentFunnel: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const data = useSelector(selectAppointmentFunnel());

  return (
    <section className={className}>
      <h3 className="text-center">Appointment Funnel</h3>
      <KendoChart style={{ margin: '0 auto', width: '90%' }}>
        <ChartTitle text={`Next ${WEEK_RANGE} weeks & Last Week`} />
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

export const ChartAverageHourlyRatePerService: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const data = useSelector(selectAverageHourlyPerService);

  return (
    <section className={className}>
      <h3 className="text-center">Average Hourly Rate Per Service</h3>
      <KendoChart seriesColors={SeriesColors}>
        <ChartTitle text={`Last ${MONTH_RANGE} months`} />
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

export const ChartStaffSales: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const data = useSelector(selectSalesPerStaffPerWeekData);

  return (
    <section className={className}>
      <h3 className="text-center">Staff Sales %</h3>
      <KendoChart seriesColors={SeriesColors}>
        <ChartTitle text={`Last ${WEEK_RANGE} weeks`} />
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
            field="percent"
          />
        </ChartSeries>
      </KendoChart>
    </section>
  );
};

export const ChartStaffUtilization: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalAppointmentHours = useSelector(selectTotalAppointmentHours);
  const totalStaffWorkHoursInWeekRange = useSelector(selectTotalStaffWorkHoursInWeekRange);
  const value = getPercentFromFull(totalAppointmentHours)(totalStaffWorkHoursInWeekRange);

  return (
    <section className={className}>
      <h3 className="mb-2">Staff Utilization</h3>
      <div className="text-muted mb-4 pt-1">{`Last ${WEEK_RANGE} weeks`}</div>
      <ArcGauge value={value} arcCenterRender={(currentValue: number, color: string) => <h3 style={{ color }}>{currentValue}%</h3>} />
    </section>
  );
};

export const ChartCancellationRate: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const canceledAppointments = useSelector(selectCanceledAppointment);
  const appointmentsPerNextWeekRangeAndLastWeek = useSelector(selectAmountAppointmentPerNextWeekRangeAndLastWeek);
  const value = getPercentFromFull(canceledAppointments)(appointmentsPerNextWeekRangeAndLastWeek);

  return (
    <section className={className}>
      <h3 className="mb-2">Cancellation Rate</h3>
      <div className="text-muted mb-4 pt-1">{`Next ${WEEK_RANGE} weeks & Last Week`}</div>
      <ArcGauge value={value} arcCenterRender={(currentValue: number, color: string) => <h3 style={{ color }}>{currentValue}%</h3>} />
    </section>
  );
};

export const ChartAverageHourlyRateAllServices: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const value = useSelector(selectAverageHourlyRateAllServices);

  return (
    <section className={className}>
      <h3 className="mb-2">Average Hourly Rate All Services</h3>
      <div className="text-muted mb-3 pt-1">{`Last ${WEEK_RANGE} weeks`}</div>
      <LinearGauge pointer={{ value, color: '#28b4c8', size: 40 }} scale={{ max: value + 20 }} style={{ height: 320 }} />
    </section>
  );
};

export const ChartAverageCustomerValue: FC<ChartItemProps> = ({ className }): JSX.Element => {
  const totalSales = useSelector(selectTotalAppointmentSalesPerLast12Months);
  const amountActiveCustomers = useSelector(selectAmountActiveCustomers);
  const value = totalSales !== 0 ? +(totalSales / amountActiveCustomers).toFixed(2) : 0;

  return (
    <section className={className}>
      <h3 className="mb-2">Average Customer Value</h3>
      <div className="text-muted mb-3 pt-1">{`Last 12 months`}</div>
      <LinearGauge pointer={{ value, color: '#f6d245', size: 40 }} scale={{ max: value + 20, minorUnit: 10, majorUnit: 50 }} style={{ height: 320 }} />
    </section>
  );
};
