import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NumericTextBox, NumericTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Selectors
import { selectProcessDataItemFieldValue } from '../../../_bus/Selectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Types
import { EditCellNumericProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../_bus/_Services/ServicesTypes';
import { EntitiesMap } from '../../../_bus/Types';

export const ServicesNumeric: FC<EditCellNumericProps<ServiceDataItem>> = ({ dataItemID, field, onChange, step, min }): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, number>(dataItemID, EntitiesMap.Services, field));

  const onNumericChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <NumericTextBox value={value} step={step} min={min} onChange={onNumericChange} disabled={isDataItemLoading} />;
};

export const ServicesNumericForDiscount: FC<EditCellNumericProps<ServiceDataItem>> = ({ dataItemID, field, onChange, step, min }): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, number>(dataItemID, EntitiesMap.Services, field));

  const onNumericChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value ? value / 100 : value });

  return <NumericTextBox value={value * 100} step={step} min={min} onChange={onNumericChange} disabled={isDataItemLoading} />;
};
