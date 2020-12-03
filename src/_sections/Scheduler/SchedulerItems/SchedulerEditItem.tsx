import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchedulerEditItem as KendoSchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Selectors
import { selectMemoFormItemID } from '../SchedulerSelectors';
// Actions
import { SchedulerActions } from '../SchedulerActions';

export const SchedulerEditItem: FC<CustomSchedulerItemProps> = ({ dataItem, ...others }): JSX.Element | null => {
  const selectFormItemID = useMemo(() => selectMemoFormItemID(dataItem.ID), [dataItem.ID]);
  const formItemID = useSelector(selectFormItemID);
  const dispatch = useDispatch();
  const formItem = formItemID && !dataItem.isNew ? dataItem : null;

  const onFormItemChange = useCallback(
    ({ value }) => {
      console.log(`changeFormItem`, value);
      SchedulerActions.setFormItemID(dispatch, value);
    },
    [dispatch]
  );

  return <KendoSchedulerEditItem {...{ ...others, dataItem }} formItem={formItem} onFormItemChange={onFormItemChange} form={SchedulerForm} />;
};
