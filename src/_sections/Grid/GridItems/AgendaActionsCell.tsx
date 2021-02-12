import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../_bus/_Appointments/AppointmentsTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Actions
import {
  createAppointmentDataItemInitAsyncAC,
  updateAppointmentDataItemInitAsyncAC,
  deleteAppointmentDataItemInitAsyncAC,
} from '../../../_bus/Entities/EntitiesAC';
// Selectors
import { selectMemoProcessDataItem, selectCustomersById, selectStaffById, selectServicesById } from '../../../_bus/Entities/EntitiesSelectors';
// Hooks
import { useByIdValidation, useStartDateEventValidation, useEndDateEventValidation } from '../GridHooks';
// Helpers
import { computedAppointmentDurationServiceChargeDescription } from '../../../_bus/_Appointments/AppointmentsHelpers';

export const AgendaActionsControlCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const dispatch = useDispatch();

  const selectDataItem = useMemo(() => selectMemoProcessDataItem<AppointmentDataItem>(ID, EntitiesKeys.Appointments), [ID]);
  const dataItem = useSelector(selectDataItem);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);

  const isCustomerIDValid = useByIdValidation(dataItem.LookupCM102customersId);
  const { isValid: isValidStartEvent } = useStartDateEventValidation(dataItem.Start, dataItem.LookupHR01teamId);
  const { isValid: isValidEndEvent } = useEndDateEventValidation(dataItem.End, dataItem.LookupHR01teamId);

  const servicesById = useSelector(selectServicesById());
  const staffById = useSelector(selectStaffById());
  const customersById = useSelector(selectCustomersById());
  const { FirstName = '', Title = '', Email = '', Gender = '(1) Female', CellPhone = '' } = customersById[dataItem.LookupCM102customersId] ?? {};

  const newDataItem = {
    ...computedAppointmentDurationServiceChargeDescription(dataItem)(servicesById)(staffById)(customersById),
    Email,
    CellPhone,
    FirstName,
    LastNameAppt: Title,
    Gender,
  };

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(createAppointmentDataItemInitAsyncAC(newDataItem, () => setIsDataItemLoading(false)));
  }, [dispatch, newDataItem]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateAppointmentDataItemInitAsyncAC(newDataItem, () => setIsDataItemLoading(false)));
  }, [dispatch, newDataItem]);

  const onDeleteDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(deleteAppointmentDataItemInitAsyncAC(dataItem.ID, () => setIsDataItemLoading(false)));
  }, [dataItem.ID, dispatch]);

  return (
    <ViewActionsControlCell
      inEdit={dataItem.inEdit}
      isNewItem={dataItem.isNew}
      dataItemID={dataItem.ID}
      isDataItemLoading={isDataItemLoading}
      isValidFields={isCustomerIDValid && isValidStartEvent && isValidEndEvent}
      entityName={EntitiesKeys.Appointments}
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
