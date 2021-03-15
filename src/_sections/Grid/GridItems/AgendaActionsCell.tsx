import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { AppointmentDataItem, TypesProcessDataItem } from '../../../_bus/_Appointments/AppointmentsTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Actions
import { createAppointmentDataItemInitAsyncAC, updateAppointmentDataItemInitAsyncAC, deleteAppointmentDataItemInitAsyncAC } from '../../../_bus/Entities/EntitiesAC';
// Selectors
import { selectMemoProcessDataItem } from '../../../_bus/Entities/EntitiesSelectors';
// Hooks
import { useByIdValidation, useStartDateEventValidation, useEndDateEventValidation } from '../GridHooks';

export const AgendaActionsControlCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const dispatch = useDispatch();

  const selectDataItem = useMemo(() => selectMemoProcessDataItem<AppointmentDataItem>(ID, EntitiesKeys.Appointments), [ID]);
  const dataItem = useSelector(selectDataItem);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);

  const isCustomerIDValid = useByIdValidation(dataItem.LookupCM102customersId ?? -1);
  const { isValid: isValidStartEvent } = useStartDateEventValidation(dataItem.Start, dataItem.LookupHR01teamId);
  const { isValid: isValidEndEvent } = useEndDateEventValidation(dataItem.End, dataItem.LookupHR01teamId);

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(createAppointmentDataItemInitAsyncAC({ ...dataItem, type: TypesProcessDataItem.Grid }, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateAppointmentDataItemInitAsyncAC({ ...dataItem, type: TypesProcessDataItem.Grid }, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onDeleteDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(deleteAppointmentDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

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
