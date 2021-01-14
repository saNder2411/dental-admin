import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../_bus/_Appointments/AppointmentsTypes';
import { EntitiesMap } from '../../../_bus/Entities/EntitiesTypes';
// Actions
import {
  createAppointmentDataItemInitAsyncAC,
  updateAppointmentDataItemInitAsyncAC,
  deleteAppointmentDataItemInitAsyncAC,
} from '../../../_bus/Entities/EntitiesAC';
// Selectors
import { selectMemoProcessDataItem, selectCustomerById } from '../../../_bus/Entities/EntitiesSelectors';
// Hooks
import { useByIdValidation, useStartDateEventValidation, useEndDateEventValidation } from '../GridHooks';

export const AgendaActionsControlCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<AppointmentDataItem>(ID, EntitiesMap.Appointments), [ID]);
  const dataItem = useSelector(selectDataItem);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();
  const isCustomerIDValid = useByIdValidation(dataItem.LookupCM102customersId);
  const { isValid: isValidStartEvent } = useStartDateEventValidation(dataItem.Start, dataItem.LookupHR01teamId);
  const { isValid: isValidEndEvent } = useEndDateEventValidation(dataItem.End, dataItem.LookupHR01teamId);
  const selectCustomer = useMemo(() => selectCustomerById(dataItem.LookupCM102customersId), [dataItem.LookupCM102customersId]);
  const customer = useSelector(selectCustomer);
  const { FirstName = '', Title = '', Email = '', Gender = '(1) Female', CellPhone = '' } = customer ? customer : {};

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    const newDataItem = { ...dataItem, Email, CellPhone, FirstName, LastNameAppt: Title, Gender };
    dispatch(createAppointmentDataItemInitAsyncAC(newDataItem, () => setIsDataItemLoading(false)));
  }, [CellPhone, Email, FirstName, Gender, Title, dataItem, dispatch]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateAppointmentDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

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
      entityName={EntitiesMap.Appointments}
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
