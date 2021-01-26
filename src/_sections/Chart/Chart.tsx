import React, { FC } from 'react';
// Components
import {
  ChartAppointmentSales,
  ChartAppointmentsPerStaff,
  ChartStaffEmployment,
  ChartServiceSales,
  ChartAverageHourlyPerService,
  ChartAverageHourlyPerAllServices,
  ChartAverageCustomerOrders,
} from './ChartItems';

export const Chart: FC = (): JSX.Element => {
  return (
    <section className="card-container row">
      <section className="border shadow-sm mr-2 pt-2 rounded col">
        <ChartAppointmentSales />
        <ChartAppointmentsPerStaff />
        <ChartServiceSales />
      </section>
      <section className="col-5">
        <section className="row justify-content-between mb-2">
          <div className="col px-1">
            <ChartStaffEmployment className="h-100 border shadow-sm rounded pt-2" />
          </div>
          <div className="col px-1">
            <ChartAverageHourlyPerService className="h-100 border shadow-sm rounded pt-2" />
          </div>
        </section>
        <section className="row row-cols-2 justify-content-between">
          <div className="col px-1">
            <ChartAverageHourlyPerAllServices className="h-100 border shadow-sm rounded py-2" />
          </div>
          <div className="col px-1">
            <ChartAverageCustomerOrders className="h-100 border shadow-sm rounded py-2" />
          </div>
        </section>
      </section>
    </section>
  );
};
