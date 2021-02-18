import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import { SchedulerForm } from './SchedulerForm';
// Selectors
import { selectMemoAppointmentProcessByID } from '../../../_bus/Entities/EntitiesSelectors';
import { selectMemoNewAppointmentDataItemForItem } from '../../../_bus/Scheduler/SchedulerSelectors';

interface Props {
  dataItemID: number;
  onHideForm: () => void;
}

export const SchedulerEditItem: FC<Props> = ({ dataItemID, onHideForm }): JSX.Element | null => {
  const selectProcessDataItem = useMemo(() => selectMemoAppointmentProcessByID(dataItemID), [dataItemID]);
  const processDataItem = useSelector(selectProcessDataItem);
  const selectNewAppointment = useMemo(selectMemoNewAppointmentDataItemForItem, []);
  const newDataItem = useSelector(selectNewAppointment);

  return newDataItem ? null : <SchedulerForm dataItem={processDataItem} onHideForm={onHideForm} />;
};
