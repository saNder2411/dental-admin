import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@progress/kendo-react-inputs';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
import { StaffDataItem } from '../../../Staff/StaffTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
import { GridDataItem } from '../GridTypes';

export const GenericTextInput: FC<EditCellProps<GridDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<GridDataItem, string | number>(dataItemID, field));

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} />;
};

export const GenericReferenceInput: FC<EditCellProps<AppointmentDataItem | ServiceDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem | ServiceDataItem, string>(dataItemID, field));

  const onReferenceChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onReferenceChange} disabled={isDataItemLoading} />;
};

export const GenericAvatarInput: FC<EditCellProps<StaffDataItem | CustomerDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem | CustomerDataItem, string>(dataItemID, field));

  const onAvatarChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onAvatarChange} disabled={isDataItemLoading} />;
};
