import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SchedulerEditItem as KendoSchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Selectors
import { selectMemoAppointmentByID } from '../../../_bus/Entities/EntitiesSelectors';

export const SchedulerEditItem: FC<CustomSchedulerItemProps> = (props): JSX.Element => {
  const { dataItem } = props;
  const selectOriginalDataItem = useMemo(() => selectMemoAppointmentByID(dataItem.ID), [dataItem.ID]);
  const originalDataItem = useSelector(selectOriginalDataItem) ?? null;

  return <KendoSchedulerEditItem {...props} formItem={originalDataItem?.isNew ? null : originalDataItem} form={SchedulerForm} />;
};
