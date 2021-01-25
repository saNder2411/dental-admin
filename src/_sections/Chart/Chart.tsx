import React, { FC } from 'react';
// Components
import {
  ChartAppointmentSales,
  ChartAppointmentsPerStaff,
  ChartStaffEmployment,
  ChartServiceSales,
  ChartAverageHourlyPerService,
  ChartAverageHourlyPerAllService,
} from './ChartItems';

export const Chart: FC = (): JSX.Element => {
  return (
    <section className="card-container row">
      <section className="border shadow-sm mr-2 pt-2 rounded col-7">
        <ChartAppointmentSales />
        <ChartAppointmentsPerStaff />
        <ChartServiceSales />
      </section>
      <section className="col">
        <section className="row">
          <ChartStaffEmployment className="border shadow-sm mr-2 pt-2 rounded col" />
          <ChartStaffEmployment className="border shadow-sm pt-2 rounded col" />
        </section>
        <section className="row">
          <ChartAverageHourlyPerService className="border shadow-sm mb-2 mr-2 pt-2 rounded col" />
          <ChartAverageHourlyPerAllService className="border shadow-sm mb-2 pt-2 rounded col" />
        </section>
      </section>
    </section>
  );
};
