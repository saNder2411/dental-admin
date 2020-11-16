import { SyntheticEvent, ChangeEvent, FC } from 'react';
import { GridCellProps as KendoGridCellProps } from '@progress/kendo-react-grid';
// Types
import { GridDataItem } from '../GridTypes';

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
