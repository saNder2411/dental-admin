import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NumericTextBox, NumericTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { ServicesNumericProps } from './GridComponentsTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';

export const ServicesNumeric: FC<ServicesNumericProps<number, ServicesDataItem>> = ({ dataItem, field, onChange, value, step, min }): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const onNumericChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return <NumericTextBox value={value} step={step} min={min} onChange={onNumericChange} disabled={isDataItemLoading} />;
};
