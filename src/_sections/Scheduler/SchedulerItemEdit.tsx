import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerEditItem, SchedulerItemProps } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from '.';
// Selectors
import { selectSchedulerState, selectFormItem } from './SchedulerSelectors';

export const SchedulerItemEdit: FC<SchedulerItemProps> = ({ dataItem, ...others }): JSX.Element | null => {
  const dataItemID = useMemo(() => dataItem.orderID, [dataItem.orderID]);
  const tr = useCallback((dataItemId) => selectFormItem(dataItemId), []);
  const formItem = useSelector(tr(dataItemID));
  const { setFormItem } = useSelector(selectSchedulerState);
  const dispatch = useDispatch();
  // console.log(`SchedulerItemEdit`, formItem);
  // console.log(`formItemEdit`, formItem);
  // console.log(`setFormItemEdit`, setFormItem);

  const onFormItemChange = useCallback(({ value }) => setFormItem(dispatch, value), [setFormItem, dispatch]);

  return <SchedulerEditItem {...{ ...others, dataItem }} formItem={formItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
