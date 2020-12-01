import { SyntheticEvent, ChangeEvent, FC } from 'react';
import { GridCellProps as KendoGridCellProps } from '@progress/kendo-react-grid';
// Types
import { GridDataItem } from '../GridTypes';

export type GridOnChange<T> = (evt: {
  dataItem: number;
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

export interface CustomGridCell extends FC<KendoGridCellProps> {
  (props: GridCellProps): JSX.Element;
}

export interface InputChangeEvent extends ChangeEvent<HTMLInputElement> {
  nativeEvent: Event;
  syntheticEvent: SyntheticEvent<HTMLInputElement>;
  target: HTMLInputElement;
  value: string;
}

export interface EditCellProps<T = GridDataItem, V = string> {
  dataItemID: number;
  field: keyof T;
  onChange: GridOnChange<T>;
  value: V;
}

export interface EditCellDropDownListProps<T = GridDataItem, V = string, D = GridDataItem> extends EditCellProps<T, V> {
  domainData?: D;
}

export interface EditCellNumericProps<T = GridDataItem, V = number> extends EditCellProps<T, V> {
  step: number;
  min: number;
}
