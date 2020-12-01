import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Selectors
import { selectFormItem } from '../SchedulerSelectors';
// Actions
import { SchedulerActions } from '../SchedulerActions';

export const SchedulerItemEdit: FC<CustomSchedulerItemProps> = ({ dataItem, ...others }): JSX.Element | null => {
  const dataItemID = useMemo(() => dataItem.ID, [dataItem.ID]);
  // const tr = useCallback((dataItemId) => selectFormItem(dataItemId), []);
  const formItemID = useSelector(selectFormItem(dataItemID));
  const dispatch = useDispatch();
  // console.log(`SchedulerItemEdit`, formItem);
  // console.log(`formItemEdit`, formItem);
  // console.log(`setFormItemEdit`, setFormItem);

  const onFormItemChange = useCallback(({ value }) => SchedulerActions.setFormItem(dispatch, value), [dispatch]);

  return (
    <SchedulerEditItem
      {...{ ...others, dataItem }}
      formItem={formItemID ? dataItem : null}
      onFormItemChange={onFormItemChange}
      form={SchedulerForm}
    />
  );
};
