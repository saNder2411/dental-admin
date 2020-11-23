import { SyntheticEvent, ChangeEvent, FC } from 'react';
import { GridCellProps as KendoGridCellProps } from '@progress/kendo-react-grid';
// Types
import { GridDataItem } from '../GridTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';

export type GridOnChange<T> = (evt: {
  dataItem: T;
  syntheticEvent: React.SyntheticEvent<HTMLElement | HTMLInputElement>;
  field: keyof T;
  value: T[keyof T] | null | string | undefined;
}) => void;

export interface GridCellProps<T = GridDataItem> {
  rowType: string;
  dataItem: T;
  field: keyof T;
  onChange: GridOnChange<T>;
}

export interface InputChangeEvent extends ChangeEvent<HTMLInputElement> {
  nativeEvent: Event;
  syntheticEvent: SyntheticEvent<HTMLInputElement>;
  target: HTMLInputElement;
  value: string;
}

export interface CustomGridCell extends FC<KendoGridCellProps> {
  (props: GridCellProps): JSX.Element;
}

export interface AgendaDropDownListProps<T = string, U = GridDataItem> extends GridCellProps<AgendaDataItem> {
  value: T;
  domainData?: U[];
}

export interface CustomersDropDownListProps<T = string, U = GridDataItem> extends GridCellProps<CustomersDataItem> {
  value: T;
  domainData?: U[];
}

export interface GenericInputProps<T = string, U = GridDataItem> extends GridCellProps<U> {
  value: T;
}

export interface GenericDropDownListProps<T = string, U = GridDataItem> extends GridCellProps<U> {
  value: T;
  domainData?: U[];
}
