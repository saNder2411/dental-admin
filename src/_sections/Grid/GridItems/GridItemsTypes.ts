import { SyntheticEvent, FC } from 'react';
import { GridCellProps as KendoGridCellProps } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
// Types
import { GenericDataItem } from '../GridTypes';

export type GridOnChange<T> = (evt: {
  dataItem: number;
  syntheticEvent: SyntheticEvent<HTMLElement | HTMLInputElement>;
  field: keyof T;
  value: T[keyof T] | null | string | undefined | string[] | boolean;
}) => void;

export interface GridCellProps<T = GenericDataItem> {
  dataItem: T;
  field: keyof T;
  onChange: GridOnChange<T>;
}

export interface CustomGridCell extends FC<KendoGridCellProps> {
  (props: GridCellProps): JSX.Element;
}

export interface InputChangeEvent {
  nativeEvent: Event;
  syntheticEvent: SyntheticEvent<HTMLInputElement>;
  target: Input;
  value: string;
}

export interface EditCellProps<T extends GenericDataItem = GenericDataItem> {
  dataItemID: number;
  field: keyof T;
  onChange: GridOnChange<T>;
}


export interface EditCellNumericProps<T extends GenericDataItem = GenericDataItem> extends EditCellProps<T> {
  step: number;
  min: number;
}
