import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../_bus/_Customers/CustomersTypes';
import { EntitiesMap } from '../../../_bus/Entities/EntitiesTypes';
// Actions
import { createCustomerDataItemInitAsyncAC, updateCustomerDataItemInitAsyncAC, deleteCustomerDataItemInitAsyncAC } from '../../../_bus/Entities/EntitiesAC';
// Selectors
import { selectMemoProcessDataItem } from '../../../_bus/Entities/EntitiesSelectors';
// Hooks
import { usePhoneFieldsValidation } from '../GridHooks';
// Helpers
import { phoneValidator } from '../../Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';

export const CustomersActionsControlCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<CustomerDataItem>(ID, EntitiesMap.Customers), [ID]);
  const dataItem = useSelector(selectDataItem);
  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();
  const isValidMobilePhone = usePhoneFieldsValidation(phoneValidator(dataItem.CellPhone));

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(createCustomerDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateCustomerDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onDeleteDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(deleteCustomerDataItemInitAsyncAC(dataItem.ID, () => setIsDataItemLoading(false)));
  }, [dataItem.ID, dispatch]);

  return (
    <ViewActionsControlCell
      inEdit={dataItem.inEdit}
      isNewItem={dataItem.isNew}
      dataItemID={dataItem.ID}
      isDataItemLoading={isDataItemLoading}
      isValidFields={isValidMobilePhone}
      entityName={EntitiesMap.Customers}
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
