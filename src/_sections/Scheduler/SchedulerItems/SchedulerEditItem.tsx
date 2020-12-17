import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SchedulerEditItem as KendoSchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Actions
import { SchedulerActions } from '../SchedulerActions';

export const SchedulerEditItem: FC<CustomSchedulerItemProps> = ({ dataItem, ...others }): JSX.Element | null => {
  const dispatch = useDispatch();

  const onFormItemChange = useCallback(({ value }) => SchedulerActions.setFormItemID(dispatch, value), [dispatch]);

  return (
    <KendoSchedulerEditItem
      {...{ ...others, dataItem }}
      formItem={dataItem.isNew ? null : dataItem}
      onFormItemChange={onFormItemChange}
      form={SchedulerForm}
    />
  );
};
