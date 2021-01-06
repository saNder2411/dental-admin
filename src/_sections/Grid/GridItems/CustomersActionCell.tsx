import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
// Actions
import { createCustomerDataItemInitAsyncAC, updateCustomerDataItemInitAsyncAC, deleteCustomerDataItemInitAsyncAC } from '../GridAC';
// Selectors
import { selectMemoProcessDataItem } from '../GridSelectors';

export const CustomersActionsControlCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<CustomerDataItem>(ID), [ID]);
  const dataItem = useSelector(selectDataItem);

  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();

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
      isValidFields
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
