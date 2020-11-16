import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
//Types
import { GridOnChange } from './GridComponentsTypes';
import { StatusNames } from '../../../Agenda/AgendaTypes';

export const onGridDropDownChange = <T>(dataItem: T, field: keyof T, onChange: GridOnChange<T>) => (evt: DropDownListChangeEvent) =>
  onChange({ dataItem, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.value });

export const isNumber = (arg: any): arg is number => typeof arg === 'number';

export const isString = (arg: any): arg is string => typeof arg === 'string';

export const isStatusNames = (arg: any): arg is StatusNames => arg === StatusNames;

export const getOnFinallyRequestDataItem = (...handlers: Array<() => void>) => () => handlers.forEach((handler) => handler());
