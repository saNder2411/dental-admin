import React, { FC, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ViewActionsControlCell } from './ViewActionsCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
// Actions
import { createAppointmentDataItemInitAsyncAC, updateAppointmentDataItemInitAsyncAC, deleteAppointmentDataItemInitAsyncAC } from '../GridAC';
// Hooks
// import { useSelectValidateField } from './GridItemsHooks';
// Selectors
import { selectMemoProcessDataItem } from '../GridSelectors';

export const AgendaActionsControlCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const selectDataItem = useMemo(() => selectMemoProcessDataItem<AppointmentDataItem>(ID), [ID]);
  const dataItem = useSelector(selectDataItem);

  const [isDataItemLoading, setIsDataItemLoading] = useState(false);
  const dispatch = useDispatch();

  const onCreateDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(createAppointmentDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onUpdatedDataItem = useCallback(() => {
    setIsDataItemLoading(true);
    dispatch(updateAppointmentDataItemInitAsyncAC(dataItem, () => setIsDataItemLoading(false)));
  }, [dataItem, dispatch]);

  const onDeleteDataItem = useCallback(
    () => {
      setIsDataItemLoading(true);
      dispatch(deleteAppointmentDataItemInitAsyncAC(dataItem.ID, () => setIsDataItemLoading(false)));
    },
    [dataItem.ID, dispatch]
  );

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
