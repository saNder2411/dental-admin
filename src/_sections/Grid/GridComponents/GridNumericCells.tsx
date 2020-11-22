import React, { FC } from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
import { NumericTextBox, NumericTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { CellDecoratorWithDataItemLoadingState } from './CellDecoratorWithDataItemLoadingState';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';

// Helpers
import { isNumber } from './GridComponentsHelpers';

export const DiscountCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 0;

  const onDiscountChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return (
    <td>
      {dataItem.inEdit ? (
        <CellDecoratorWithDataItemLoadingState>
          <NumericTextBox value={numValue} step={0.01} min={0} onChange={onDiscountChange} />
        </CellDecoratorWithDataItemLoadingState>
      ) : (
        <span>{`${value ? numValue * 100 : `0`}%`}</span>
      )}
    </td>
  );
};

export const DurationCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 5;

  const onDurationChange = ({ syntheticEvent, target: { value } }: NumericTextBoxChangeEvent) => onChange({ dataItem, field, syntheticEvent, value });

  return (
    <td>
      {dataItem.inEdit ? (
        <CellDecoratorWithDataItemLoadingState>
          <NumericTextBox value={numValue} step={5} min={5} onChange={onDurationChange} />
        </CellDecoratorWithDataItemLoadingState>
      ) : (
        <span>{value}</span>
      )}
    </td>
  );
};

export const TotalPriceCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem, field }): JSX.Element => {
  const intlService = useInternationalization();
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 0;
  const calcValue = numValue > 0 ? numValue - numValue * dataItem.OfferingDiscount : 0;

  return (
    <SC.GenericCurrencyCell isNegativeAmount={calcValue < 0}>
      <span>{intlService.formatNumber(calcValue, 'c')}</span>
    </SC.GenericCurrencyCell>
  );
};
