import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@progress/kendo-react-inputs';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { InputChangeEvent, GenericInputProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';

export const GenericReferenceInput: FC<GenericInputProps<string, AgendaDataItem | ServicesDataItem>> = ({ dataItem, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const onReferenceChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return <Input value={value} placeholder="Ref: TBA-000" onChange={onReferenceChange} disabled={isDataItemLoading} />;
};

export const GenericTextInput: FC<GenericInputProps<string | number>> = ({ dataItem, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  console.log(value);

  const onTextChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return <Input value={value} onChange={onTextChange} disabled={isDataItemLoading} />;
};
