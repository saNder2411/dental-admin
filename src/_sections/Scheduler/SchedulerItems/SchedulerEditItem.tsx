import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SchedulerEditItem as KendoSchedulerEditItem } from '@progress/kendo-react-scheduler';
// Components
import { SchedulerForm } from './SchedulerForm';
// Types
import { CustomSchedulerItemProps } from './SchedulerItemTypes';
// Selectors
import { selectMemoAppointmentProcessByID } from '../../../_bus/Entities/EntitiesSelectors';

interface Props {
  dataItemID: number;
  onHideForm?: () => void;
}

export const SchedulerEditItem: FC<Props> = ({ dataItemID, onHideForm }): JSX.Element => {
  const selectProcessDataItem = useMemo(() => selectMemoAppointmentProcessByID(dataItemID), [dataItemID]);
  const processDataItem = useSelector(selectProcessDataItem);

  // return <KendoSchedulerEditItem {...props} formItem={processDataItem?.isNew ? null : processDataItem} form={SchedulerForm} />;

  return <SchedulerForm dataItem={processDataItem} onHideForm={onHideForm} />;
};
