import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
// Actions
import { createServiceDataItemInitAsyncAC, updateServiceDataItemInitAsyncAC, deleteServiceDataItemInitAsyncAC } from '../GridAC';
// Selectors
import { selectMemoProcessDataItem } from '../GridSelectors';

export const ServicesActionsControlCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<ServiceDataItem>(ID), [ID]);
  const dataItem = useSelector(selectDataItem);

  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(createServiceDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateServiceDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onDeleteDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(deleteServiceDataItemInitAsyncAC(dataItem.ID, () => setIsDataItemLoading(false)));
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
