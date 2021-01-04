import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NumericTextBox, NumericTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectDataItemIsLoading } from '../GridSelectors';
// Types
import { EditCellNumericProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';

export const ServicesNumeric: FC<EditCellNumericProps<ServiceDataItem, number>> = ({
  dataItemID,
  field,
  onChange,
  value,
  step,
  min,
}): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);

  const onNumericChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <NumericTextBox value={value} step={step} min={min} onChange={onNumericChange} disabled={isDataItemLoading} />;
};

export const ServicesNumericForDiscount: FC<EditCellNumericProps<ServiceDataItem, number>> = ({
  dataItemID,
  field,
  onChange,
  value,
  step,
  min,
}): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);

  const onNumericChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value ? value / 100 : value });

  return <NumericTextBox value={value * 100} step={step} min={min} onChange={onNumericChange} disabled={isDataItemLoading} />;
};
