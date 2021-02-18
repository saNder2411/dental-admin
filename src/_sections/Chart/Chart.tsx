import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import {
  ChartAppointmentsPerWeek,
  ChartAppointmentSales,
  ChartStaffStatistics,
  ChartCancellationRate,
  ChartStaffUtilization,
  ChartSalesByOfferingCategory,
  ChartAverageHourlyRatePerService,
  ChartAverageHourlyRateAllServices,
  ChartAverageCustomerValue,
  ChartAppointmentFunnel,
  ChartStaffSales,
  ChartAppointmentValue,
} from './ChartItems';
// Selectors
import { selectMemoUser } from '../../_bus/User/UserSelectors';
// Types
import { UserRoles } from '../../_bus/User/UserTypes';

export const Chart: FC = (): JSX.Element => {
  const selectUser = useMemo(() => selectMemoUser(), []);
  const user = useSelector(selectUser);
  const isOwner = user && user.role === UserRoles.Owner;

  return (
    <section className="card-container row">
      <section className="border shadow-sm mr-2 pt-2 rounded col">
        <ChartAppointmentsPerWeek />
        <ChartStaffStatistics />
        <ChartSalesByOfferingCategory />
        {isOwner && <ChartAppointmentSales />}
      </section>
      <section className="col-5">
        <section className="row mb-2">
          <div className="col px-1">
            <ChartCancellationRate className="h-100 border shadow-sm rounded pt-2" />
          </div>
          <div className="col px-1">
            <ChartAppointmentFunnel className="h-100 border shadow-sm rounded py-2" />
          </div>
        </section>
        <section className="row mb-2">
          <div className="col px-1">
            <ChartAverageHourlyRatePerService className="h-100 border shadow-sm rounded pt-2" />
          </div>
          <div className="col px-1">
            <ChartAverageHourlyRateAllServices className="h-100 border shadow-sm rounded py-2" />
          </div>
        </section>
        <section className="row">
          <div className="col-6 px-1">
            <ChartAverageCustomerValue className="h-100 border shadow-sm rounded py-2" />
          </div>
          <div className="col-6 px-1">
            <ChartStaffSales className="h-100 border shadow-sm rounded pt-2" />
          </div>
        </section>
        {isOwner && (
          <section className="row mt-2">
            <div className="col-6 px-1">
              <ChartStaffUtilization className="h-100 border shadow-sm rounded pt-2" />
            </div>
            <div className="col-6 px-1">
              <ChartAppointmentValue className="h-100 border shadow-sm rounded pt-2" />
            </div>
          </section>
        )}
      </section>
    </section>
  );
};
