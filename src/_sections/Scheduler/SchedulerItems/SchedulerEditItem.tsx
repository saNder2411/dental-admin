import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerEditItem as KendoSchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Selectors
import { selectMemoOriginalDataItem } from '../../Grid/GridSelectors';
// Action Creators
import { setFormItemIdAC } from '../../Grid/GridAC';

export const SchedulerEditItem: FC<CustomSchedulerItemProps> = (props): JSX.Element => {
  const { dataItem } = props;
  const dispatch = useDispatch();
  const selectOriginalDataItem = useMemo(() => selectMemoOriginalDataItem(dataItem.ID), [dataItem.ID]);
  const originalDataItem = useSelector(selectOriginalDataItem) ?? null;

  const onFormItemChange = useCallback(({ value }) => dispatch(setFormItemIdAC(value)), [dispatch]);

  return (
    <KendoSchedulerEditItem
      {...props}
      formItem={originalDataItem?.isNew ? null : originalDataItem}
      onFormItemChange={onFormItemChange}
      form={SchedulerForm}
    />
  );
};
