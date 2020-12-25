import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@progress/kendo-react-inputs';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
import { GridDataItem } from '../GridTypes';

export const GenericTextInput: FC<EditCellProps<GridDataItem, string | number>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} />;
};

export const GenericReferenceInput: FC<EditCellProps<AppointmentDataItem | ServicesDataItem>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const onReferenceChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} placeholder="Ref: TBA-000" onChange={onReferenceChange} disabled={isDataItemLoading} />;
};

export const GenericAvatarInput: FC<EditCellProps<TeamStaffDataItem | CustomerDataItem>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const onAvatarChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onAvatarChange} disabled={isDataItemLoading} />;
};
