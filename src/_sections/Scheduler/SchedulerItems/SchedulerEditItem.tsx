import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerEditItem as KendoSchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Actions
import { SchedulerActions } from '../SchedulerActions';
// Selectors
import {selectMemoOriginalDataItem} from '../SchedulerSelectors'

export const SchedulerEditItem: FC<CustomSchedulerItemProps> = (props): JSX.Element => {
  const { dataItem } = props;
  const dispatch = useDispatch();
  const selectOriginalDataItem = useMemo(() => selectMemoOriginalDataItem(dataItem.ID), [dataItem.ID])
  const originalDataItem = useSelector(selectOriginalDataItem) ?? null;
  console.log(`SchedulerEditItemDataIte`, originalDataItem)

  const onFormItemChange = useCallback(({ value }) => SchedulerActions.setFormItemID(dispatch, value), [dispatch]);

  return <KendoSchedulerEditItem {...props} formItem={originalDataItem?.isNew ? null : originalDataItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
