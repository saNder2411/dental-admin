import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../_bus/Staff/StaffTypes';
import { EntitiesMap } from '../../../_bus/Types';
// Actions
import { createStaffDataItemInitAsyncAC, updateStaffDataItemInitAsyncAC, deleteStaffDataItemInitAsyncAC } from '../../../_bus/AC';
// Selectors
import { selectMemoProcessDataItem } from '../../../_bus/Selectors';
// Hooks
import { useTextFieldsValidation, usePhoneFieldsValidation } from '../GridHooks';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const StaffActionsControlCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<StaffDataItem>(ID, EntitiesMap.Staff), [ID]);
  const dataItem = useSelector(selectDataItem);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();
  const isValidFullName = useTextFieldsValidation(dataItem.FullName);
  const isValidJobTitle = useTextFieldsValidation(dataItem.JobTitle);
  const isValidMobilePhone = usePhoneFieldsValidation(phoneValidator(dataItem.CellPhone));

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(createStaffDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateStaffDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onDeleteDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(deleteStaffDataItemInitAsyncAC(dataItem.ID, () => setIsDataItemLoading(false)));
  }, [dataItem.ID, dispatch]);

  return (
    <ViewActionsControlCell
      inEdit={dataItem.inEdit}
      isNewItem={dataItem.isNew}
      dataItemID={dataItem.ID}
      isDataItemLoading={isDataItemLoading}
      isValidFields={isValidFullName && isValidJobTitle && isValidMobilePhone}
      entityName={EntitiesMap.Staff}
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
