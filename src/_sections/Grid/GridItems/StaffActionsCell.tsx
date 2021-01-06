import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Actions
import { createStaffDataItemInitAsyncAC, updateStaffDataItemInitAsyncAC, deleteStaffDataItemInitAsyncAC } from '../GridAC';
// Selectors
import { selectMemoProcessDataItem } from '../GridSelectors';

export const StaffActionsControlCell: FC<GridCellProps<StaffDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<StaffDataItem>(ID), [ID]);
  const dataItem = useSelector(selectDataItem);

  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();

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
      isValidFields
      onCreateDataItem={onCreateDataItem}
      onUpdatedDataItem={onUpdatedDataItem}
      onDeleteDataItem={onDeleteDataItem}
    />
  );
};
