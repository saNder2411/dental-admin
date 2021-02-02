import React, { FC } from 'react';
// Components
import {
  ChartAppointmentSales,
  ChartAppointmentsPerStaff,
  ChartStaffEmployment,
  ChartServiceProductSales,
  ChartAverageHourlyPerService,
  ChartAverageHourlyPerAllServices,
  ChartAverageCustomerOrders,
  ChartAppointmentFunnel,
  ChartSalesPerStaffPerWeek,
} from './ChartItems';

export const Chart: FC = (): JSX.Element => (
  <section className="card-container row">
    <section className="border shadow-sm mr-2 pt-2 rounded col">
      <ChartAppointmentSales />
      <ChartAppointmentsPerStaff />
      <ChartServiceProductSales />
    </section>
    <section className="col-5">
      <section className="row mb-2">
        <div className="col px-1">
          <ChartStaffEmployment className="h-100 border shadow-sm rounded pt-2" />
        </div>
        <div className="col px-1">
          <ChartAppointmentFunnel className="h-100 border shadow-sm rounded py-2" />
        </div>
      </section>
      <section className="row mb-2">
        <div className="col px-1">
          <ChartAverageHourlyPerService className="h-100 border shadow-sm rounded pt-2" />
        </div>
        <div className="col px-1">
          <ChartAverageHourlyPerAllServices className="h-100 border shadow-sm rounded py-2" />
        </div>
      </section>
      <section className="row">
        <div className="col-6 px-1">
          <ChartAverageCustomerOrders className="h-100 border shadow-sm rounded py-2" />
        </div>
        <div className="col-6 px-1">
          <ChartSalesPerStaffPerWeek className="h-100 border shadow-sm rounded pt-2" />
        </div>
      </section>
    </section>
  </section>
);
