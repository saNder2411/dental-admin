import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerEditItem as KendoSchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Selectors
import { selectFormItem } from '../SchedulerSelectors';
// Actions
import { SchedulerActions } from '../SchedulerActions';

export const SchedulerEditItem: FC<CustomSchedulerItemProps> = ({ dataItem, ...others }): JSX.Element | null => {
  const dataItemID = useMemo(() => dataItem.ID, [dataItem.ID]);
  // const tr = useCallback((dataItemId) => selectFormItem(dataItemId), []);
  const formItemID = useSelector(selectFormItem(dataItemID));
  const dispatch = useDispatch();
  // console.log(`SchedulerEditItem`, formItem);
  // console.log(`formItemEdit`, formItem);
  // console.log(`setFormItemEdit`, setFormItem);

  const onFormItemChange = useCallback(({ value }) => SchedulerActions.setFormItem(dispatch, value), [dispatch]);

  return (
    <KendoSchedulerEditItem
      {...{ ...others, dataItem }}
      formItem={formItemID ? dataItem : null}
      onFormItemChange={onFormItemChange}
      form={SchedulerForm}
    />
  );
};
