import React, { FC } from 'react';
import { useInternationalization } from '@progress/kendo-react-intl';
import { NumericTextBox, NumericTextBoxChangeEvent } from '@progress/kendo-react-inputs';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Components
import { ViewInputCellWithDataItemLoading } from './ViewInputCellWithDataItemLoading';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
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
        <ViewInputCellWithDataItemLoading>
          <NumericTextBox value={numValue} step={0.01} min={0} onChange={onDiscountChange} />
        </ViewInputCellWithDataItemLoading>
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
        <ViewInputCellWithDataItemLoading>
          <NumericTextBox value={numValue} step={5} min={5} onChange={onDurationChange} />
        </ViewInputCellWithDataItemLoading>
      ) : (
        <span>{value}</span>
      )}
    </td>
  );
};

export const CurrencyCell: FC<GridCellProps<AgendaDataItem | ServicesDataItem>> = ({ dataItem, field }): JSX.Element => {
  const intlService = useInternationalization();
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 50;

  return <SC.CurrencyCell isNegativeAmount={numValue < 0}>{intlService.formatNumber(numValue, 'c')}</SC.CurrencyCell>;
};

export const TotalPriceCell: FC<GridCellProps<ServicesDataItem>> = ({ dataItem, field }): JSX.Element => {
  const intlService = useInternationalization();
  const value = dataItem[field];
  const numValue = isNumber(value) ? value : 0;
  const calcValue = numValue > 0 ? numValue - numValue * dataItem.OfferingDiscount : 0;

  return (
    <SC.CurrencyCell isNegativeAmount={calcValue < 0}>
      <span>{intlService.formatNumber(calcValue, 'c')}</span>
    </SC.CurrencyCell>
  );
};
