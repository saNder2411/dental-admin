import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../_bus/_Services/ServicesTypes';
import { EntitiesMap } from '../../../_bus/Types';
// Actions
import { createServiceDataItemInitAsyncAC, updateServiceDataItemInitAsyncAC, deleteServiceDataItemInitAsyncAC } from '../../../_bus/AC';
// Selectors
import { selectMemoProcessDataItem } from '../../../_bus/Selectors';

export const ServicesActionsControlCell: FC<GridCellProps<ServiceDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<ServiceDataItem>(ID, EntitiesMap.Services), [ID]);
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
      entityName={EntitiesMap.Services}
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
